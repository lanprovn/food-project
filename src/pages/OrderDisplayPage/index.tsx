import React from 'react';
import { useOrderDisplay } from './hooks/useOrderDisplay';
import { OrderDisplayHeader } from './components/OrderDisplayHeader';
import { OrderStatusSection } from './components/OrderStatusSection';
import { EmptyState } from '../../components/common/ui/EmptyState';
import { getStatusSections } from './utils/orderDisplayUtils';

const OrderDisplayPage: React.FC = () => {
  const { orders, groupedOrders, currentTime } = useOrderDisplay();
  const statusSections = getStatusSections(groupedOrders);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <OrderDisplayHeader currentTime={currentTime} />

        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            {statusSections.map((section) => (
              <OrderStatusSection
                key={section.key}
                section={section}
                currentTime={currentTime}
              />
            ))}
          </div>
        )}
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderDisplayPage;

