import React, { useState } from 'react';
import ButtonFilled from '../components/shared/ButtonFilled';

const TrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !phoneNumber.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock tracking data
      const mockOrder = {
        id: orderId,
        status: 'delivering',
        estimatedTime: '15 phút',
        driver: {
          name: 'Nguyễn Văn A',
          phone: '0901234567',
          avatar: '/src/assets/img/gallery/food-world.png'
        },
        items: [
          { name: 'Phở Bò Đặc Biệt', quantity: 2, price: 65000 },
          { name: 'Coca Cola', quantity: 1, price: 15000 }
        ],
        total: 145000,
        address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
        orderTime: '14:30',
        estimatedDelivery: '15:00'
      };
      
      setTrackingResult(mockOrder);
      setIsLoading(false);
    }, 2000);
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'preparing':
        return {
          text: 'Đang chuẩn bị',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          icon: 'fas fa-utensils'
        };
      case 'ready':
        return {
          text: 'Sẵn sàng giao',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          icon: 'fas fa-check-circle'
        };
      case 'delivering':
        return {
          text: 'Đang giao hàng',
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          icon: 'fas fa-motorcycle'
        };
      case 'delivered':
        return {
          text: 'Đã giao hàng',
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          icon: 'fas fa-check-double'
        };
      default:
        return {
          text: 'Đang xử lý',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          icon: 'fas fa-clock'
        };
    }
  };

  const statusInfo = trackingResult ? getStatusInfo(trackingResult.status) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <i className="fas fa-truck mr-2 text-yellow-300"></i>
              Theo dõi đơn hàng
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              THEO DÕI ĐƠN HÀNG
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Theo dõi trạng thái đơn hàng của bạn theo thời gian thực
            </p>
          </div>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tra cứu đơn hàng
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nhập mã đơn hàng và số điện thoại để theo dõi trạng thái giao hàng
            </p>
          </div>
          
          <form onSubmit={handleTrackOrder} className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mã đơn hàng
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Nhập mã đơn hàng"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <ButtonFilled
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Đang tìm kiếm...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search mr-2"></i>
                    Tra cứu đơn hàng
                  </>
                )}
              </ButtonFilled>
            </div>
          </form>
        </div>
      </section>

      {/* Tracking Result */}
      {trackingResult && (
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Order Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Đơn hàng #{trackingResult.id}</h3>
                    <p className="text-white/90">Đặt lúc {trackingResult.orderTime}</p>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusInfo?.bgColor} ${statusInfo?.color}`}>
                      <i className={`${statusInfo?.icon} mr-2`}></i>
                      {statusInfo?.text}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết đơn hàng</h4>
                    <div className="space-y-3">
                      {trackingResult.items.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-gray-900">{item.price.toLocaleString('vi-VN')}₫</p>
                        </div>
                      ))}
                      <div className="flex items-center justify-between py-2 border-t-2 border-gray-200">
                        <p className="text-lg font-bold text-gray-900">Tổng cộng</p>
                        <p className="text-lg font-bold text-orange-600">{trackingResult.total.toLocaleString('vi-VN')}₫</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin giao hàng</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt text-orange-500 mr-3"></i>
                        <span className="text-gray-700">{trackingResult.address}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-clock text-orange-500 mr-3"></i>
                        <span className="text-gray-700">Dự kiến giao: {trackingResult.estimatedDelivery}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-motorcycle text-orange-500 mr-3"></i>
                        <span className="text-gray-700">Còn lại: {trackingResult.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Driver Info */}
                {trackingResult.driver && (
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin tài xế</h4>
                    <div className="flex items-center space-x-4">
                      <img
                        src={trackingResult.driver.avatar}
                        alt={trackingResult.driver.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{trackingResult.driver.name}</h5>
                        <p className="text-gray-600">{trackingResult.driver.phone}</p>
                      </div>
                      <div className="flex space-x-2">
                        <ButtonFilled variant="primary" size="sm">
                          <i className="fas fa-phone mr-2"></i>
                          Gọi
                        </ButtonFilled>
                        <ButtonFilled variant="secondary" size="sm">
                          <i className="fas fa-comment mr-2"></i>
                          Chat
                        </ButtonFilled>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Tiến trình đơn hàng</h4>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Đơn hàng đã được xác nhận</p>
                        <p className="text-sm text-gray-500">14:30 - Hôm nay</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-check text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Đang chuẩn bị món ăn</p>
                        <p className="text-sm text-gray-500">14:35 - Hôm nay</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-motorcycle text-white text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Đang giao hàng</p>
                        <p className="text-sm text-gray-500">14:45 - Hôm nay</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                        <i className="fas fa-check-double text-gray-500 text-sm"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-500">Đã giao hàng</p>
                        <p className="text-sm text-gray-400">Chưa hoàn thành</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn theo dõi đơn hàng?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những tính năng giúp bạn theo dõi đơn hàng một cách dễ dàng và chính xác
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Theo dõi thời gian thực</h3>
              <p className="text-gray-600">Cập nhật trạng thái đơn hàng theo thời gian thực</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mobile-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thông báo tự động</h3>
              <p className="text-gray-600">Nhận thông báo khi đơn hàng thay đổi trạng thái</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-headset text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Liên hệ tài xế và hỗ trợ khách hàng mọi lúc</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackingPage;
