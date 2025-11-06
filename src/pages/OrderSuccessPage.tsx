import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

interface OrderDetails {
  id: string;
  timestamp: number;
  total: number;
  items: number;
  customerName: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
    size: string | null;
    toppings: string[];
    note: string | null;
  }>;
}

interface LocationState {
  orderId?: string;
  paymentMethod?: 'cash' | 'card' | 'qr';
  customerName?: string;
  table?: string;
}

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateOrderStatus } = useCart();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get order details from localStorage
  useEffect(() => {
    const loadOrderDetails = () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const storedData = localStorage.getItem(`dailySales_${today}`);
        
        if (storedData) {
          const dailySales = JSON.parse(storedData);
          const orders = dailySales.orders || [];
          
          // Get the most recent order (last in array)
          if (orders.length > 0) {
            const latestOrder = orders[orders.length - 1];
            setOrderDetails(latestOrder);
          }
        }
        
        // Get payment method from location state if available
        const state = location.state as LocationState | null;
        if (state?.paymentMethod) {
          setPaymentMethod(state.paymentMethod);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading order details:', error);
        setIsLoading(false);
      }
    };

    loadOrderDetails();
  }, [location.state]);

  // Send completed status to display when page loads
  useEffect(() => {
    updateOrderStatus('completed');
  }, [updateOrderStatus]);

  const formatOrderTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentMethodText = (method: string | null): string => {
    switch (method) {
      case 'cash':
        return 'Tiền mặt';
      case 'card':
        return 'Thẻ ngân hàng';
      case 'qr':
        return 'Quét mã QR';
      default:
        return 'Chưa xác định';
    }
  };

  const handleNewOrder = () => {
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Icon with Animation */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-green-500 rounded-full p-6 shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 text-white animate-scale-in" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Đơn hàng đã được ghi nhận!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Cảm ơn bạn đã sử dụng dịch vụ của Ocha Việt.
          </p>
          <p className="text-gray-500">
            Đơn hàng của bạn đang được chuẩn bị.
          </p>
        </div>

        {/* Order Details Card */}
        {orderDetails && (
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
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Sản phẩm đã đặt:</h3>
              <div className="space-y-2">
                {orderDetails.products.map((product, index) => (
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

            {/* Total Price */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-800">Tổng cộng:</span>
              <span className="text-2xl font-bold text-orange-600">
                {formatPrice(orderDetails.total)}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={handleNewOrder}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Tạo đơn mới</span>
          </button>
          <button 
            onClick={handleGoHome}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Về trang chủ</span>
          </button>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;
