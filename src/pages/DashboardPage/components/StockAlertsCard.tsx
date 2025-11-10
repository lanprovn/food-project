import React from 'react';
import { getOutOfStockProducts } from '../../../utils/stockManagement';
import type { StockAlert } from '../../../utils/stockManagement';

interface StockAlertsCardProps {
  stockAlerts: StockAlert[];
}

export const StockAlertsCard: React.FC<StockAlertsCardProps> = ({ stockAlerts }) => {
  const unreadAlerts = stockAlerts.filter(alert => !alert.isRead).length;
  const outOfStockCount = getOutOfStockProducts().length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">Cảnh Báo Tồn Kho</p>
          <p className="text-3xl font-bold text-gray-900">
            {unreadAlerts}
          </p>
          <p className="text-sm text-gray-500">
            {outOfStockCount} hết hàng
          </p>
        </div>
        <div className="p-3 bg-red-100 rounded-full">
          ⚠️
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm text-red-600">
        📦
        <span className="ml-1">Cần xử lý</span>
      </div>
    </div>
  );
};

