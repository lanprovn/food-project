import { useCallback, useEffect, useRef } from 'react';
import { logger, trackEvent, trackPerformance } from '../utils/monitoring';

/**
 * Custom hook for application-wide logging and analytics
 * Provides easy access to logging functions with React context
 */
export const useAppLogger = () => {
  const performanceTimers = useRef<Map<string, number>>(new Map());

  // Track user interactions
  const trackUserAction = useCallback((action: string, properties?: Record<string, any>) => {
    trackEvent(`user_action_${action}`, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  }, []);

  // Track page views
  const trackPageView = useCallback((page: string, properties?: Record<string, any>) => {
    trackEvent('page_view', {
      page,
      timestamp: new Date().toISOString(),
      ...properties
    });
  }, []);

  // Track business events (POS specific)
  const trackPOSEvent = useCallback((event: string, properties?: Record<string, any>) => {
    trackEvent(`pos_${event}`, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  }, []);

  // Track cart operations
  const trackCartOperation = useCallback((operation: 'add' | 'remove' | 'update' | 'clear', properties?: Record<string, any>) => {
    trackEvent(`cart_${operation}`, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  }, []);

  // Track checkout flow
  const trackCheckoutStep = useCallback((step: string, properties?: Record<string, any>) => {
    trackEvent(`checkout_${step}`, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  }, []);

  // Track errors with context
  const trackError = useCallback((error: Error, context?: Record<string, any>) => {
    logger.error('Application error occurred', error, {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      ...context
    });
  }, []);

  // Performance tracking helpers
  const startPerformanceTimer = useCallback((operation: string) => {
    performanceTimers.current.set(operation, performance.now());
  }, []);

  const endPerformanceTimer = useCallback((operation: string, context?: Record<string, any>) => {
    const startTime = performanceTimers.current.get(operation);
    if (startTime) {
      const duration = performance.now() - startTime;
      trackPerformance(operation, duration, context);
      performanceTimers.current.delete(operation);
    }
  }, []);

  // Track component lifecycle
  const trackComponentMount = useCallback((componentName: string) => {
    trackEvent('component_mount', { component: componentName });
  }, []);

  const trackComponentUnmount = useCallback((componentName: string) => {
    trackEvent('component_unmount', { component: componentName });
  }, []);

  // Track API calls
  const trackAPICall = useCallback((endpoint: string, method: string, success: boolean, duration?: number) => {
    trackEvent('api_call', {
      endpoint,
      method,
      success,
      duration,
      timestamp: new Date().toISOString()
    });
  }, []);

  // Track user session
  const trackSessionStart = useCallback((userId?: string) => {
    trackEvent('session_start', {
      userId,
      timestamp: new Date().toISOString(),
      sessionId: logger.sessionId
    });
  }, []);

  const trackSessionEnd = useCallback((userId?: string) => {
    trackEvent('session_end', {
      userId,
      timestamp: new Date().toISOString(),
      sessionId: logger.sessionId
    });
  }, []);

  // Auto-track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent('page_hidden');
      } else {
        trackEvent('page_visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Auto-track page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      trackSessionEnd();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [trackSessionEnd]);

  return {
    // Core logging
    logError: logger.error.bind(logger),
    logInfo: logger.info.bind(logger),
    logWarn: logger.warn.bind(logger),
    logDebug: logger.debug.bind(logger),
    
    // User tracking
    setUser: logger.setUser.bind(logger),
    clearUser: logger.clearUser.bind(logger),
    
    // Event tracking
    trackUserAction,
    trackPageView,
    trackPOSEvent,
    trackCartOperation,
    trackCheckoutStep,
    trackError,
    
    // Performance tracking
    startPerformanceTimer,
    endPerformanceTimer,
    
    // Component tracking
    trackComponentMount,
    trackComponentUnmount,
    
    // API tracking
    trackAPICall,
    
    // Session tracking
    trackSessionStart,
    trackSessionEnd,
    
    // Direct access to logger
    logger
  };
};
