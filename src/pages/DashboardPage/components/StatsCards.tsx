import React from 'react';
import { RevenueCard } from './RevenueCard';
import { OrdersCard } from './OrdersCard';
import { AverageOrderCard } from './AverageOrderCard';
import { TopProductCard } from './TopProductCard';
import { StockAlertsCard } from './StockAlertsCard';
import type { DailySales } from '../types';
import type { StockAlert } from '../../../utils/stockManagement';

interface StatsCardsProps {
  dailySales: DailySales | null;
  stockAlerts: StockAlert[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ 
  dailySales, 
  stockAlerts 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <RevenueCard dailySales={dailySales} />
      <OrdersCard dailySales={dailySales} />
      <AverageOrderCard dailySales={dailySales} />
      <TopProductCard dailySales={dailySales} />
      <StockAlertsCard stockAlerts={stockAlerts} />
    </div>
  );
};

