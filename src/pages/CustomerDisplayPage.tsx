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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-60 left-1/4 w-3 h-3 bg-teal-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-96 left-1/2 w-1 h-1 bg-lime-400 rounded-full animate-pulse opacity-70" style={{animationDelay: '1.5s'}}></div>
        
        {/* Large Floating Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 right-32 w-16 h-16 border border-green-200/30 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-32 left-32 w-12 h-12 border border-emerald-200/30 rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-1/3 left-16 w-8 h-8 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full animate-bounce" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/80 border-b border-green-200/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-all duration-500 hover:rotate-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-lime-400 to-green-500 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Ocha Việt
                </h1>
                <p className="text-sm text-gray-600 font-medium tracking-wide">Trải Nghiệm Khách Hàng Cao Cấp</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Hệ Thống Trực Tuyến</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4 bg-green-100/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-green-200/50">
                <div className="relative">
                  <div className={`w-4 h-4 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}></div>
                  <div className={`absolute inset-0 w-4 h-4 rounded-full ${isConnected ? 'bg-green-500 animate-ping opacity-30' : 'bg-red-400 animate-ping opacity-30'}`}></div>
                </div>
                <span className="text-sm font-semibold text-green-700">
                  {isConnected ? 'Hệ Thống Hoạt Động' : 'Hệ Thống Ngoại Tuyến'}
                </span>
              </div>
              <div className="bg-green-100/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border border-green-200/50">
                <div className="text-sm font-semibold text-green-700 flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{new Date().toLocaleTimeString('vi-VN')}</span>
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {new Date().toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-12">
        {error ? (
          // Error State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center shadow-2xl animate-bounce backdrop-blur-sm border border-red-500/30">
                <svg className="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-ping opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500 rounded-full animate-pulse opacity-40"></div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Lỗi Kết Nối
            </h2>
            <p className="text-gray-300 mb-10 max-w-lg text-lg leading-relaxed">{error}</p>
            <button
              className="px-10 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 text-lg font-semibold shadow-2xl hover:shadow-red-500/25 transform hover:scale-105 hover:-translate-y-1"
              onClick={() => window.location.reload()}
            >
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Tải Lại Hệ Thống</span>
              </div>
            </button>
          </div>
        ) : !displayData || displayData.items.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-12">
              <div className="w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full flex items-center justify-center shadow-2xl animate-pulse backdrop-blur-sm border border-emerald-500/30">
                <svg className="w-20 h-20 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-bounce shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute top-8 -left-8 w-6 h-6 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
            </div>
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Chờ Đơn Hàng Của Bạn
            </h2>
            <div className="flex space-x-3">
              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-bounce shadow-lg"></div>
              <div className="w-4 h-4 bg-green-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.1s'}}></div>
              <div className="w-4 h-4 bg-teal-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
              <div className="w-4 h-4 bg-lime-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
        ) : (
          // Order Content - Split Layout
          <div className="grid grid-cols-10 gap-10 h-full">
            {/* Left Side - 70% - Order Items */}
            <div className="col-span-7 space-y-8">
              {/* Customer Info */}
              {displayData.customerInfo && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-200/30 hover:bg-white/90 transition-all duration-500">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                        <span className="text-2xl font-bold text-white">
                          {getCustomerInitial(displayData.customerInfo.name)}
                        </span>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-lime-400 to-green-500 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {displayData.customerInfo.name || 'Khách Hàng Thân Thiết'}
                      </h3>
                      {displayData.customerInfo.table && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <p className="text-green-600 font-semibold">Bàn: {displayData.customerInfo.table}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-green-200/30 h-full">
                <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-10 py-8">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <svg className="w-8 h-8 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Hành Trình Ẩm Thực Của Bạn ({displayData.totalItems} món)
                  </h3>
                </div>

                <div className="p-8 overflow-y-auto max-h-[calc(100vh-400px)]">
                  <div className="space-y-6">
                    {displayData.items.map((item) => (
                      <div key={item.id} className="p-8 hover:bg-green-50/50 transition-all duration-500 group rounded-2xl border border-green-200/30 hover:border-green-300/50 hover:shadow-xl">
                        <div className="flex items-start space-x-6">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-2xl object-cover bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105"
                              onError={(e) => {
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDI4IDQ0IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0zNiAyOEw0NCAzNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-xl">
                              {item.quantity}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-600 transition-colors duration-500">{item.name}</h4>
                            <div className="space-y-2 text-sm text-gray-600">
                              {item.selectedSize && (
                                <div className="flex items-center">
                                  <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3 shadow-lg"></span>
                                  <span className="font-semibold">Kích thước: <span className="text-gray-700">{item.selectedSize.name}</span></span>
                                </div>
                              )}
                              {item.selectedToppings.length > 0 && (
                                <div className="flex items-center">
                                  <span className="w-3 h-3 bg-green-400 rounded-full mr-3 shadow-lg"></span>
                                  <span className="font-semibold">Topping: <span className="text-gray-700">{item.selectedToppings.map(t => t.name).join(', ')}</span></span>
                                </div>
                              )}
                              {item.note && (
                                <div className="flex items-center">
                                  <span className="w-3 h-3 bg-teal-400 rounded-full mr-3 shadow-lg"></span>
                                  <span className="font-semibold">Ghi chú: <span className="text-gray-700">{item.note}</span></span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-800">
                              {formatPrice(item.totalPrice)}
                            </div>
                            <div className="text-sm text-gray-500 font-medium mt-1">
                              SL: {item.quantity}
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
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-200/30 h-full flex flex-col">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Tóm Tắt Đơn Hàng
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <p className="text-gray-600 text-sm font-semibold">
                      {displayData.totalItems} món ăn
                    </p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-6 mb-8">
                  {displayData.timestamp && (
                    <div className="flex items-center text-gray-700 text-sm bg-green-50/80 rounded-xl p-4 backdrop-blur-sm">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold">Thời Gian Đặt Hàng</div>
                        <div className="text-xs text-gray-500">{formatOrderTime(displayData.timestamp)}</div>
                      </div>
                    </div>
                  )}
                  {displayData.status === 'paid' && displayData.paymentMethod && (
                    <div className="flex items-center text-gray-700 text-sm bg-green-50/80 rounded-xl p-4 backdrop-blur-sm">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <div>
                        <div className="font-semibold">Phương Thức Thanh Toán</div>
                        <div className="text-xs text-gray-500">
                          {displayData.paymentMethod === 'cash' ? 'Tiền mặt' : 
                           displayData.paymentMethod === 'card' ? 'Thẻ ngân hàng' : 
                           'Quét mã QR'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Total Price */}
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-3">
                    {formatPrice(displayData.totalPrice)}
                  </div>
                  <div className="text-gray-600 text-sm font-semibold">Tổng Tiền</div>
                </div>

                {/* Progress Bar */}
                {displayData.status !== 'completed' && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600 font-semibold">
                        {getOrderProgress(displayData.status).text}
                      </span>
                      <span className="text-sm text-gray-600 font-semibold">
                        {getOrderProgress(displayData.status).progress}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-green-100/80 rounded-full overflow-hidden backdrop-blur-sm">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                        style={{ width: `${getOrderProgress(displayData.status).progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="text-center mt-auto">
                  <div className={`inline-flex items-center px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl ${
                    displayData.status === 'creating' ? 'bg-gradient-to-r from-lime-400 to-green-500 text-white' :
                    displayData.status === 'confirmed' ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white' :
                    displayData.status === 'paid' ? 'bg-gradient-to-r from-teal-400 to-emerald-500 text-white' :
                    'bg-gradient-to-r from-green-400 to-teal-500 text-white'
                  }`}>
                    <div className="w-3 h-3 bg-white rounded-full mr-3 animate-pulse"></div>
                    {getStatusText(displayData.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-xl bg-white/80 border-t border-green-200/30 mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse shadow-lg"></div>
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '0.5s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1s'}}></div>
            <div className="w-3 h-3 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full animate-pulse shadow-lg" style={{animationDelay: '1.5s'}}></div>
          </div>
          <p className="text-sm text-gray-700 font-semibold mb-2">
            © 2024 Ocha Việt POS - Trải Nghiệm Khách Hàng Cao Cấp
          </p>
          <p className="text-xs text-gray-600 font-medium">
            Được hỗ trợ bởi Công Nghệ Thời Gian Thực Tiên Tiến • Được tạo với ❤️
          </p>
          <div className="flex items-center justify-center space-x-2 mt-3">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600 font-medium">Hệ Thống Hoạt Động</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerDisplayPage;
