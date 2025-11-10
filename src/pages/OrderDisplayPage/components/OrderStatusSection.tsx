import React from 'react';
import type { StatusSection } from '../types';
import { OrderCard } from './OrderCard';
import type { OrderTracking } from '../../../types/display';

interface OrderStatusSectionProps {
  section: StatusSection;
  currentTime: Date;
}

export const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
  section,
  currentTime
}) => {
  if (section.orders.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <span>{section.title}</span>
        <span className="text-sm font-normal text-gray-500">
          ({section.orders.length})
        </span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {section.orders.map((order) => (
          <OrderCard key={order.id} order={order} currentTime={currentTime} />
        ))}
      </div>
    </div>
  );
};

