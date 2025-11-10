import React from 'react';
import { formatPrice } from '../../../utils/formatPrice';
import { formatOrderTime, getPaymentMethodText } from '../utils/orderSuccessUtils';
import type { OrderDetails, PaymentMethod } from '../types';

interface OrderInfoCardProps {
  orderDetails: OrderDetails;
  paymentMethod: PaymentMethod;
}

export const OrderInfoCard: React.FC<OrderInfoCardProps> = ({
  orderDetails,
  paymentMethod
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200">
        Thông tin đơn hàng
      </h2>

      {/* Order ID */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Mã đơn hàng:</span>
        </div>
        <span className="text-sm font-mono text-orange-600 font-bold">{orderDetails.id}</span>
      </div>

      {/* Order Time */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Thời gian đặt:</span>
        </div>
        <span className="text-sm text-gray-600">{formatOrderTime(orderDetails.timestamp)}</span>
      </div>

      {/* Customer Name */}
      {orderDetails.customerName && (
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Khách hàng:</span>
          </div>
          <span className="text-sm text-gray-600">{orderDetails.customerName}</span>
        </div>
      )}

      {/* Payment Method */}
      {paymentMethod && (
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span className="text-sm font-semibold text-gray-700">Thanh toán:</span>
          </div>
          <span className="text-sm text-gray-600">{getPaymentMethodText(paymentMethod)}</span>
        </div>
      )}

      {/* Order Items */}
      <OrderItemsList products={orderDetails.products} />

      {/* Total Price */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
        <span className="text-2xl font-bold text-orange-600">
          {formatPrice(orderDetails.total)}
        </span>
      </div>
    </div>
  );
};

interface OrderItemsListProps {
  products: OrderDetails['products'];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ products }) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Sản phẩm đã đặt:</h3>
      <div className="space-y-2">
        {products.map((product, index) => (
          <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">{product.name}</span>
                <span className="text-xs text-gray-500">x{product.quantity}</span>
              </div>
              {product.size && (
                <p className="text-xs text-gray-600 mt-1">Size: {product.size}</p>
              )}
              {product.toppings.length > 0 && (
                <p className="text-xs text-gray-600 mt-1">
                  Topping: {product.toppings.join(', ')}
                </p>
              )}
              {product.note && (
                <p className="text-xs text-gray-500 italic mt-1">Ghi chú: {product.note}</p>
              )}
            </div>
            <span className="text-sm font-semibold text-orange-600 ml-4">
              {formatPrice(product.price)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

