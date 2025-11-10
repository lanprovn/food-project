import React from 'react';
import { formatCurrency } from '../utils/dashboardFormatters';
import { getPaymentMethodStats } from '../utils/dashboardCalculations';
import type { DailySales } from '../types';

interface PaymentStatsProps {
  dailySales: DailySales | null;
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ dailySales }) => {
  const paymentStats = getPaymentMethodStats(dailySales);
  const totalRevenue = dailySales?.totalRevenue || 1;

  const paymentMethods = [
    { key: 'cash', label: 'Tiền mặt', icon: '💵', color: 'bg-green-500' },
    { key: 'card', label: 'Thẻ ngân hàng', icon: '💳', color: 'bg-blue-500' },
    { key: 'qr', label: 'QR Code', icon: '📱', color: 'bg-purple-500' }
  ];

  if (Object.keys(paymentStats).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống Kê Thanh Toán</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">💳</div>
          <p className="text-gray-500 text-sm">Chưa có dữ liệu thanh toán</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống Kê Thanh Toán</h3>
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const stats = paymentStats[method.key];
          if (!stats) return null;
          
          const percentage = ((stats.revenue / totalRevenue) * 100).toFixed(1);
          
          return (
            <div key={method.key} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{method.icon}</span>
                  <span className="font-semibold text-gray-800">{method.label}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(stats.revenue)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1 mx-2">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${method.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 w-20 text-right">
                  {stats.count} đơn ({percentage}%)
                </div>
              </div>
            </div>
          );
        }).filter(Boolean)}
      </div>
    </div>
  );
};

