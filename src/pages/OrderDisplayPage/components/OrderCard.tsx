import React from 'react';
import type { OrderTracking } from '../../../types/display';
import { formatPrice } from '../../../utils/formatPrice';
import { formatOrderTime, getStatusConfig, getPaymentMethodText } from '../utils/orderDisplayUtils';

interface OrderCardProps {
  order: OrderTracking;
  currentTime: Date;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, currentTime }) => {
  const statusConfig = getStatusConfig(order.status);
  const isPaidOrAfter = ['paid', 'preparing', 'completed'].includes(order.status);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in">
      {/* Order Header */}
      <div className={`p-4 ${statusConfig.bgColor} text-white`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{statusConfig.icon}</span>
            <span className="font-semibold text-lg">
              {order.createdByName || (order.createdBy === 'staff' ? 'Nhân Viên' : 'Khách Hàng')}
            </span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm`}>
            {statusConfig.label}
          </div>
        </div>
        
        {/* Order ID & Customer Info */}
        <div className="space-y-1 text-sm">
          {order.orderId && (
            <div className="flex items-center space-x-2">
              <span className="opacity-90">Mã đơn:</span>
              <span className="font-bold">{order.orderId}</span>
            </div>
          )}
          {order.customerInfo?.name && (
            <div className="flex items-center space-x-2">
              <span className="opacity-90">Khách hàng:</span>
              <span className="font-semibold">{order.customerInfo.name}</span>
            </div>
          )}
          {order.customerInfo?.table && (
            <div className="flex items-center space-x-2">
              <span className="opacity-90">Bàn:</span>
              <span className="font-semibold">{order.customerInfo.table}</span>
            </div>
          )}
          {order.customerInfo?.phone && (
            <div className="flex items-center space-x-2">
              <span className="opacity-90">SĐT:</span>
              <span className="font-semibold">{order.customerInfo.phone}</span>
            </div>
          )}
        </div>

        {/* Payment Info */}
        {isPaidOrAfter && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span className="opacity-90">Thanh toán:</span>
                <span className="font-semibold">{getPaymentMethodText(order.paymentMethod)}</span>
              </div>
              {order.paidAt && (
                <div className="opacity-90">
                  {formatOrderTime(order.paidAt, currentTime)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="p-4 max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{item.name}</div>
                {item.selectedSize && (
                  <div className="text-sm text-gray-600 mt-1">
                    Size: {item.selectedSize.name}
                  </div>
                )}
                {item.selectedToppings.length > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Topping: {item.selectedToppings.map(t => t.name).join(', ')}
                  </div>
                )}
                {item.note && (
                  <div className="text-sm text-gray-500 italic mt-1">
                    Ghi chú: {item.note}
                  </div>
                )}
              </div>
              <div className="text-right ml-4">
                <div className="font-semibold text-gray-800">
                  {item.quantity}x
                </div>
                <div className="text-sm text-gray-600">
                  {formatPrice(item.totalPrice)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-600">Tổng cộng</div>
            <div className="text-2xl font-bold text-gray-800">
              {formatPrice(order.totalPrice)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">{order.totalItems} món</div>
            <div className="text-xs text-gray-500">
              Cập nhật: {formatOrderTime(order.lastUpdated, currentTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

