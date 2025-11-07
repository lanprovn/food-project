import React, { useEffect, useState, useMemo } from 'react';
import { useOrderTracking } from '../hooks/useOrderTracking';
import type { OrderTracking } from '../types/display';
import { formatPrice } from '../utils/formatPrice';

/**
 * OrderDisplayPage - Hiển thị danh sách orders đang được tạo real-time
 * Tự động hiển thị orders từ cả nhân viên và khách hàng
 * (Vì chỉ có 1 người order tại 1 thời điểm)
 * 
 * Sau khi thanh toán thành công, sẽ navigate đến order-success page
 */
const OrderDisplayPage: React.FC = () => {
  const { subscribeToOrders } = useOrderTracking();
  const [orders, setOrders] = useState<OrderTracking[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Subscribe to order tracking updates - hiển thị TẤT CẢ orders
  useEffect(() => {
    const unsubscribe = subscribeToOrders((updatedOrders) => {
      // Hiển thị tất cả orders (không filter)
      setOrders(updatedOrders);
    });

    return unsubscribe;
  }, [subscribeToOrders]);

  // Group orders by status
  const groupedOrders = useMemo(() => {
    const groups: Record<string, OrderTracking[]> = {
      creating: [],
      paid: [],
      preparing: [],
      completed: []
    };

    orders.forEach(order => {
      if (order.status in groups) {
        groups[order.status].push(order);
      }
    });

    return groups;
  }, [orders]);

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = currentTime.getTime();
    const diff = now - timestamp;
    
    if (diff < 60000) { // Less than 1 minute
      return 'Vừa xong';
    } else if (diff < 3600000) { // Less than 1 hour
      const minutes = Math.floor(diff / 60000);
      return `${minutes} phút trước`;
    } else {
      return date.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getStatusConfig = (status: OrderTracking['status']) => {
    switch (status) {
      case 'creating':
        return {
          label: 'Đang tạo',
          bgColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
          badgeColor: 'bg-yellow-100 text-yellow-800',
          icon: '📝'
        };
      case 'paid':
        return {
          label: 'Đã thanh toán',
          bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          badgeColor: 'bg-blue-100 text-blue-800',
          icon: '💳'
        };
      case 'preparing':
        return {
          label: 'Đang chuẩn bị',
          bgColor: 'bg-gradient-to-r from-purple-500 to-pink-600',
          badgeColor: 'bg-purple-100 text-purple-800',
          icon: '👨‍🍳'
        };
      case 'completed':
        return {
          label: 'Hoàn thành',
          bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
          badgeColor: 'bg-green-100 text-green-800',
          icon: '✅'
        };
      default:
        return {
          label: status,
          bgColor: 'bg-gradient-to-r from-gray-500 to-gray-600',
          badgeColor: 'bg-gray-100 text-gray-800',
          icon: '📦'
        };
    }
  };

  const getPaymentMethodText = (method?: 'cash' | 'card' | 'qr'): string => {
    switch (method) {
      case 'cash': return 'Tiền mặt';
      case 'card': return 'Thẻ ngân hàng';
      case 'qr': return 'QR Code';
      default: return 'Chưa thanh toán';
    }
  };

  const renderOrderCard = (order: OrderTracking) => {
    const statusConfig = getStatusConfig(order.status);
    const isPaidOrAfter = ['paid', 'preparing', 'completed'].includes(order.status);

    return (
      <div
        key={order.id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in"
      >
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
                    {formatTime(order.paidAt)}
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
                Cập nhật: {formatTime(order.lastUpdated)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const statusSections = [
    { key: 'creating', title: '📝 Đang Tạo', orders: groupedOrders.creating },
    { key: 'paid', title: '💳 Đã Thanh Toán', orders: groupedOrders.paid },
    { key: 'preparing', title: '👨‍🍳 Đang Chuẩn Bị', orders: groupedOrders.preparing },
    { key: 'completed', title: '✅ Hoàn Thành', orders: groupedOrders.completed }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                📋 Hiển Thị Đơn Hàng
              </h1>
              <p className="text-gray-600">
                Theo dõi các đơn hàng đang được tạo và xử lý real-time
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Thời gian hiện tại</div>
              <div className="text-2xl font-bold text-gray-800">
                {currentTime.toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Orders by Status */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Chưa có đơn hàng nào
            </h3>
            <p className="text-gray-500">
              Chưa có đơn hàng nào đang được tạo hoặc xử lý
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {statusSections.map(({ key, title, orders: sectionOrders }) => {
              if (sectionOrders.length === 0) return null;
              
              return (
                <div key={key}>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                    <span>{title}</span>
                    <span className="text-sm font-normal text-gray-500">
                      ({sectionOrders.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sectionOrders.map(renderOrderCard)}
                  </div>
                </div>
              );
            })}
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
