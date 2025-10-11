/**
 * Monitoring and Logging Utilities
 * Provides centralized logging, error tracking, and analytics
 */

// Mock Sentry configuration (ready for production)
interface SentryConfig {
  dsn?: string;
  environment?: string;
  enabled: boolean;
}

const SENTRY_CONFIG: SentryConfig = {
  dsn: process.env.VITE_SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'development',
  enabled: process.env.VITE_SENTRY_ENABLED === 'true'
};

// Mock Sentry functions (will be replaced with real Sentry in production)
const mockSentry = {
  init: (config: any) => {
    if (SENTRY_CONFIG.enabled) {
      console.log('[Sentry] Initialized with config:', config);
    }
  },
  captureException: (error: Error, context?: any) => {
    if (SENTRY_CONFIG.enabled) {
      console.error('[Sentry] Exception captured:', error, context);
    }
  },
  captureMessage: (message: string, level: 'info' | 'warning' | 'error' = 'info') => {
    if (SENTRY_CONFIG.enabled) {
      console.log(`[Sentry] ${level.toUpperCase()}:`, message);
    }
  },
  addBreadcrumb: (breadcrumb: any) => {
    if (SENTRY_CONFIG.enabled) {
      console.log('[Sentry] Breadcrumb:', breadcrumb);
    }
  },
  setUser: (user: any) => {
    if (SENTRY_CONFIG.enabled) {
      console.log('[Sentry] User set:', user);
    }
  },
  setContext: (key: string, context: any) => {
    if (SENTRY_CONFIG.enabled) {
      console.log(`[Sentry] Context ${key}:`, context);
    }
  }
};

// Log levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// Log entry interface
interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}

// Analytics event interface
interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

class Logger {
  private sessionId: string;
  private userId?: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeSentry();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeSentry(): void {
    if (SENTRY_CONFIG.enabled && SENTRY_CONFIG.dsn) {
      mockSentry.init({
        dsn: SENTRY_CONFIG.dsn,
        environment: SENTRY_CONFIG.environment,
        beforeSend: (event: any) => {
          // Filter out development errors
          if (SENTRY_CONFIG.environment === 'development') {
            return null;
          }
          return event;
        }
      });
    }
  }

  private createLogEntry(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      context,
      userId: this.userId,
      sessionId: this.sessionId
    };
  }

  private logToConsole(entry: LogEntry): void {
    const { level, message, timestamp, context } = entry;
    const logMessage = `[${timestamp.toISOString()}] [${level.toUpperCase()}] ${message}`;
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(logMessage, context);
        break;
      case LogLevel.INFO:
        console.info(logMessage, context);
        break;
      case LogLevel.WARN:
        console.warn(logMessage, context);
        break;
      case LogLevel.ERROR:
        console.error(logMessage, context);
        break;
    }
  }

  private logToSentry(entry: LogEntry): void {
    if (!SENTRY_CONFIG.enabled) return;

    const { level, message, context } = entry;

    switch (level) {
      case LogLevel.ERROR:
        mockSentry.captureException(new Error(message), context);
        break;
      case LogLevel.WARN:
        mockSentry.captureMessage(message, 'warning');
        break;
      default:
        mockSentry.captureMessage(message, 'info');
    }
  }

  // Public logging methods
  debug(message: string, context?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, message, context);
    this.logToConsole(entry);
  }

  info(message: string, context?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.INFO, message, context);
    this.logToConsole(entry);
    this.logToSentry(entry);
  }

  warn(message: string, context?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.WARN, message, context);
    this.logToConsole(entry);
    this.logToSentry(entry);
  }

  error(message: string, error?: Error, context?: Record<string, any>): void {
    const entry = this.createLogEntry(LogLevel.ERROR, message, context);
    this.logToConsole(entry);
    
    if (error) {
      mockSentry.captureException(error, { ...context, message });
    } else {
      this.logToSentry(entry);
    }
  }

  // User tracking
  setUser(userId: string, userInfo?: Record<string, any>): void {
    this.userId = userId;
    mockSentry.setUser({ id: userId, ...userInfo });
    this.info('User session started', { userId, ...userInfo });
  }

  clearUser(): void {
    this.userId = undefined;
    mockSentry.setUser(null);
    this.info('User session ended');
  }

  // Analytics tracking
  trackEvent(event: string, properties?: Record<string, any>): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      userId: this.userId,
      timestamp: new Date()
    };

    this.info(`Analytics Event: ${event}`, analyticsEvent);
    
    // In production, this would send to analytics service
    if (SENTRY_CONFIG.enabled) {
      mockSentry.addBreadcrumb({
        category: 'analytics',
        message: event,
        data: properties
      });
    }
  }

  // Performance tracking
  trackPerformance(operation: string, duration: number, context?: Record<string, any>): void {
    this.info(`Performance: ${operation}`, {
      duration,
      operation,
      ...context
    });
  }

  // Error boundary helper
  captureReactError(error: Error, errorInfo: any): void {
    this.error('React Error Boundary caught error', error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: errorInfo.errorBoundary
    });
  }
}

// Create singleton instance
export const logger = new Logger();

// Export types for use in components
export type { LogEntry, AnalyticsEvent };

// Convenience functions for common use cases
export const logError = (message: string, error?: Error, context?: Record<string, any>) => {
  logger.error(message, error, context);
};

export const logInfo = (message: string, context?: Record<string, any>) => {
  logger.info(message, context);
};

export const trackEvent = (event: string, properties?: Record<string, any>) => {
  logger.trackEvent(event, properties);
};

export const trackPerformance = (operation: string, duration: number, context?: Record<string, any>) => {
  logger.trackPerformance(operation, duration, context);
};
