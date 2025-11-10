import React from 'react';
import { formatCurrency, formatTime } from '../utils/dashboardFormatters';
import type { DailySales } from '../types';

interface RecentOrdersProps {
  orders: DailySales['orders'] | undefined;
}

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  const recentOrders = orders
    ?.sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10) || [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn Hàng Gần Đây</h3>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Đơn #{order.id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatTime(order.timestamp)} • {order.customerName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(order.total)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.items} món
                  </p>
                </div>
              </div>
              
              {/* Product Details */}
              {order.products && order.products.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex justify-between items-start text-xs">
                        <div className="flex-1">
                          <p className="font-medium text-gray-700">
                            {product.quantity}x {product.name}
                          </p>
                          {product.size && (
                            <p className="text-gray-500">Size: {product.size}</p>
                          )}
                          {product.toppings.length > 0 && (
                            <p className="text-gray-500">
                              Topping: {product.toppings.join(', ')}
                            </p>
                          )}
                          {product.note && (
                            <p className="text-gray-500 italic">Ghi chú: {product.note}</p>
                          )}
                        </div>
                        <div className="text-right ml-2">
                          <p className="font-medium text-gray-700">
                            {formatCurrency(product.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500">Chưa có đơn hàng nào hôm nay</p>
          </div>
        )}
      </div>
    </div>
  );
};

