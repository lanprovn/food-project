import React, { useState, useEffect } from 'react';
import { useDisplaySync } from '../hooks/useDisplaySync';
import { formatPrice } from '../utils/formatPrice';
import type { DisplayData } from '../types/display';

/**
 * CustomerDisplayPage - Professional Customer Display Screen
 * 
 * Features:
 * - Clean, professional design without background colors
 * - Minimalist interface focused on content
 * - Real-time sync with POS system
 * - Responsive layout for all screen sizes
 * - Subtle animations and transitions
 * - Professional customer-facing interface
 */
const CustomerDisplayPage: React.FC = () => {
  const { subscribeToDisplay } = useDisplaySync();
  const [displayData, setDisplayData] = useState<DisplayData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = subscribeToDisplay((data) => {
        console.log('📡 Received display data:', data);
        setDisplayData(data);
        setIsConnected(true);
        setError(null);
      });
      return unsubscribe;
    } catch (err) {
      console.error('Error subscribing to display:', err);
      setError('Không thể kết nối với hệ thống POS');
    }
  }, [subscribeToDisplay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected(displayData !== null);
    }, 1000);
    return () => clearInterval(interval);
  }, [displayData]);

  const getStatusText = (status: DisplayData['status']) => {
    switch (status) {
      case 'creating':
        return 'Đang tạo đơn hàng...';
      case 'confirmed':
        return 'Đơn hàng đã xác nhận ✅';
      case 'paid':
        return 'Thanh toán thành công! 💳✨';
      case 'completed':
        return 'Cảm ơn bạn! Đơn hàng đã hoàn thành 🎉';
      default:
        return 'Đang tạo đơn hàng...';
    }
  };

  const getCustomerInitial = (name?: string) => {
    if (!name) return 'K';
    return name.charAt(0).toUpperCase();
  };

  const formatOrderTime = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getOrderProgress = (status: DisplayData['status']) => {
    switch (status) {
      case 'creating':
        return { progress: 25, text: 'Đang tạo đơn hàng...' };
      case 'confirmed':
        return { progress: 50, text: 'Đơn hàng đã xác nhận' };
      case 'paid':
        return { progress: 75, text: 'Thanh toán thành công!' };
      case 'completed':
        return { progress: 100, text: 'Hoàn thành!' };
      default:
        return { progress: 0, text: 'Chờ xử lý...' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ocha Việt
                </h1>
                <p className="text-sm text-gray-600 font-medium">Customer Display System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="text-sm font-medium text-gray-700">
                  {isConnected ? 'Live Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                <div className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleTimeString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {error ? (
          // Error State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-xl animate-bounce">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Connection Error
            </h2>
            <p className="text-gray-600 mb-8 max-w-md text-lg">{error}</p>
            <button
              className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => window.location.reload()}
            >
              🔄 Refresh Page
            </button>
          </div>
        ) : !displayData || displayData.items.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                <svg className="w-16 h-16 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Waiting for Order
            </h2>
            <p className="text-gray-600 max-w-md text-lg mb-6">
              Our staff is preparing something amazing for you. Please wait...
            </p>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        ) : (
          // Order Content - Split Layout
          <div className="grid grid-cols-10 gap-8 h-full">
            {/* Left Side - 70% - Order Items */}
            <div className="col-span-7 space-y-6">
              {/* Customer Info */}
              {displayData.customerInfo && (
                <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-xl font-bold text-white">
                          {getCustomerInitial(displayData.customerInfo.name)}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {displayData.customerInfo.name || 'Customer'}
                      </h3>
                      {displayData.customerInfo.table && (
                        <p className="text-sm text-gray-600 font-medium">Table: {displayData.customerInfo.table}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 h-full">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Your Order ({displayData.totalItems} items)
                  </h3>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(100vh-300px)]">
                  <div className="space-y-4">
                    {displayData.items.map((item) => (
                      <div key={item.id} className="p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 group rounded-xl border border-gray-100">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-xl object-cover bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDI4IDQ0IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zNiAyOEw0NCAzNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">{item.name}</h4>
                            <div className="space-y-1 text-sm text-gray-600">
                              {item.selectedSize && (
                                <div className="flex items-center">
                                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                                  Size: <span className="font-semibold ml-1">{item.selectedSize.name}</span>
                                </div>
                              )}
                              {item.selectedToppings.length > 0 && (
                                <div className="flex items-center">
                                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                                  Toppings: <span className="font-semibold ml-1">{item.selectedToppings.map(t => t.name).join(', ')}</span>
                                </div>
                              )}
                              {item.note && (
                                <div className="flex items-center">
                                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                  Note: <span className="font-semibold ml-1">{item.note}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {formatPrice(item.totalPrice)}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - 30% - Price Summary */}
            <div className="col-span-3">
              <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white rounded-2xl p-6 shadow-2xl border border-white/10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                    Order Summary
                  </h3>
                  <p className="text-blue-200 text-sm font-medium">
                    {displayData.totalItems} items
                  </p>
                </div>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  {displayData.timestamp && (
                    <div className="flex items-center text-blue-300 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatOrderTime(displayData.timestamp)}
                    </div>
                  )}
                  {displayData.status === 'paid' && displayData.paymentMethod && (
                    <div className="flex items-center text-green-300 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      {displayData.paymentMethod === 'cash' ? 'Tiền mặt' : 
                       displayData.paymentMethod === 'card' ? 'Thẻ ngân hàng' : 
                       'Quét mã QR'}
                    </div>
                  )}
                </div>

                {/* Total Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-2">
                    {formatPrice(displayData.totalPrice)}
                  </div>
                  <div className="text-blue-200 text-sm">Total Amount</div>
                </div>

                {/* Progress Bar */}
                {displayData.status !== 'completed' && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-blue-200 font-medium">
                        {getOrderProgress(displayData.status).text}
                      </span>
                      <span className="text-sm text-blue-200 font-medium">
                        {getOrderProgress(displayData.status).progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                        style={{ width: `${getOrderProgress(displayData.status).progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="text-center mt-auto">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    displayData.status === 'creating' ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' :
                    displayData.status === 'confirmed' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                    displayData.status === 'paid' ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white' :
                    'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    {getStatusText(displayData.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-md bg-white/60 border-t border-white/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-orange-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            © 2024 Ocha Việt POS - Customer Display System
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Powered by Real-time Technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerDisplayPage;
