import React, { useState, useEffect } from 'react';
import { getStockAlerts, getOutOfStockProducts, markAlertAsRead } from '../../utils/stockManagement';
import type { StockAlert } from '../../utils/stockManagement';

const StockAlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<StockAlert[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadAlerts = () => {
      const stockAlerts = getStockAlerts();
      const unreadAlerts = stockAlerts.filter(alert => !alert.isRead);
      setAlerts(unreadAlerts);
      setIsVisible(unreadAlerts.length > 0);
    };

    loadAlerts();

    // Listen for stock updates
    const handleStockUpdate = () => {
      loadAlerts();
    };

    window.addEventListener('stockAlert', handleStockUpdate);
    
    return () => {
      window.removeEventListener('stockAlert', handleStockUpdate);
    };
  }, []);

  const handleDismiss = (alertId: string) => {
    markAlertAsRead(alertId);
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
    if (alerts.length === 1) {
      setIsVisible(false);
    }
  };

  const handleDismissAll = () => {
    alerts.forEach(alert => markAlertAsRead(alert.id));
    setAlerts([]);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 text-lg">⚠️</span>
            <h3 className="text-sm font-semibold text-red-800">
              Cảnh Báo Tồn Kho ({alerts.length})
            </h3>
          </div>
          <button
            onClick={handleDismissAll}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            ✕ Tất cả
          </button>
        </div>
        
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="bg-white rounded p-3 border border-red-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-red-700">{alert.message}</p>
                  <p className="text-xs text-red-500 mt-1">
                    {new Date(alert.timestamp).toLocaleTimeString('vi-VN')}
                  </p>
                </div>
                <button
                  onClick={() => handleDismiss(alert.id)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {alerts.length > 5 && (
          <div className="mt-3 text-center">
            <button
              onClick={() => window.location.href = '/stock-management'}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Xem tất cả ({alerts.length} cảnh báo)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAlertsPanel;
