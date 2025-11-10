import React from 'react';
import { formatCurrency } from '../utils/dashboardFormatters';
import { getHourlyRevenue } from '../utils/dashboardCalculations';
import type { DailySales } from '../types';

interface RevenueChartProps {
  dailySales: DailySales | null;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ dailySales }) => {
  const hourlyData = getHourlyRevenue(dailySales);
  const totalRevenue = dailySales?.totalRevenue || 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Doanh Thu Theo Giờ</h3>
      <div className="space-y-3">
        {hourlyData.map((hour, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-600 w-16">{hour.hour}</span>
            <div className="flex-1 mx-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${totalRevenue > 0 
                      ? (hour.revenue / totalRevenue) * 100 
                      : 0}%` 
                  }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 w-20 text-right">
              {formatCurrency(hour.revenue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

