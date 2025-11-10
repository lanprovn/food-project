import React, { useState, useEffect } from 'react';
import { getStockAlerts, markAlertAsRead } from '../../../../utils/stockManagement';
import { getIngredientAlerts, markIngredientAlertAsRead } from '../../../../utils/ingredientManagement';
import type { StockAlert } from '../../../../utils/stockManagement';
import type { IngredientAlert } from '../../../../utils/ingredientManagement';

const StockAlertsPanel: React.FC = () => {
  const [productAlerts, setProductAlerts] = useState<StockAlert[]>([]);
  const [ingredientAlerts, setIngredientAlerts] = useState<IngredientAlert[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadAlerts = () => {
      const stockAlerts = getStockAlerts();
      const ingredientStockAlerts = getIngredientAlerts();
      
      const unreadProductAlerts = stockAlerts.filter(alert => !alert.isRead);
      const unreadIngredientAlerts = ingredientStockAlerts.filter(alert => !alert.isRead);
      
      setProductAlerts(unreadProductAlerts);
      setIngredientAlerts(unreadIngredientAlerts);
      setIsVisible(unreadProductAlerts.length > 0 || unreadIngredientAlerts.length > 0);
    };

    loadAlerts();

    // Listen for stock updates
    const handleStockUpdate = () => {
      loadAlerts();
    };

    window.addEventListener('stockAlert', handleStockUpdate);
    window.addEventListener('ingredientAlert', handleStockUpdate);
    
    return () => {
      window.removeEventListener('stockAlert', handleStockUpdate);
      window.removeEventListener('ingredientAlert', handleStockUpdate);
    };
  }, []);

  const handleDismissProductAlert = (alertId: string) => {
    markAlertAsRead(alertId);
    setProductAlerts(prev => prev.filter(alert => alert.id !== alertId));
    if (productAlerts.length === 1 && ingredientAlerts.length === 0) {
      setIsVisible(false);
    }
  };

  const handleDismissIngredientAlert = (alertId: string) => {
    markIngredientAlertAsRead(alertId);
    setIngredientAlerts(prev => prev.filter(alert => alert.id !== alertId));
    if (ingredientAlerts.length === 1 && productAlerts.length === 0) {
      setIsVisible(false);
    }
  };

  const handleDismissAll = () => {
    productAlerts.forEach(alert => markAlertAsRead(alert.id));
    ingredientAlerts.forEach(alert => markIngredientAlertAsRead(alert.id));
    setProductAlerts([]);
    setIngredientAlerts([]);
    setIsVisible(false);
  };

  const totalAlerts = productAlerts.length + ingredientAlerts.length;

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 text-lg">⚠️</span>
            <h3 className="text-sm font-semibold text-red-800">
              Cảnh Báo Tồn Kho ({totalAlerts})
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
          {/* Product Alerts */}
          {productAlerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="bg-white rounded p-3 border border-red-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">📦</span>
                    <p className="text-sm text-red-700">{alert.message}</p>
                  </div>
                  <p className="text-xs text-red-500">
                    {new Date(alert.timestamp).toLocaleTimeString('vi-VN')}
                  </p>
                </div>
                <button
                  onClick={() => handleDismissProductAlert(alert.id)}
                  className="text-red-400 hover:text-red-600 ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          
          {/* Ingredient Alerts */}
          {ingredientAlerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="bg-white rounded p-3 border border-orange-100">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">🥛</span>
                    <p className="text-sm text-orange-700">{alert.message}</p>
                  </div>
                  <p className="text-xs text-orange-500">
                    {new Date(alert.timestamp).toLocaleTimeString('vi-VN')}
                  </p>
                </div>
                <button
                  onClick={() => handleDismissIngredientAlert(alert.id)}
                  className="text-orange-400 hover:text-orange-600 ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {totalAlerts > 6 && (
          <div className="mt-3 text-center">
            <button
              onClick={() => window.location.href = '/stock-management'}
              className="text-sm text-red-600 hover:text-red-800 underline"
            >
              Xem tất cả ({totalAlerts} cảnh báo)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockAlertsPanel;
