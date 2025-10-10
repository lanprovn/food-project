import React, { useState } from 'react';
import ButtonFilled from '../components/shared/ButtonFilled';

const BookPartyPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    guestCount: '',
    date: '',
    time: '',
    location: '',
    budget: '',
    specialRequests: ''
  });

  const eventTypes = [
    { id: 'birthday', name: 'Sinh nhật', icon: 'fas fa-birthday-cake' },
    { id: 'wedding', name: 'Cưới hỏi', icon: 'fas fa-heart' },
    { id: 'corporate', name: 'Sự kiện công ty', icon: 'fas fa-briefcase' },
    { id: 'family', name: 'Gia đình', icon: 'fas fa-users' },
    { id: 'friends', name: 'Bạn bè', icon: 'fas fa-user-friends' },
    { id: 'other', name: 'Khác', icon: 'fas fa-calendar' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Party booking form:', formData);
    // TODO: Implement party booking API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <i className="fas fa-calendar-alt mr-2 text-yellow-300"></i>
              Đặt tiệc
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              ĐẶT TIỆC
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Tổ chức sự kiện đặc biệt với thực đơn phong phú và dịch vụ chuyên nghiệp
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">100+</div>
                <div className="text-white/80">Sự kiện</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-white/80">Món ăn</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-white/80">Hỗ trợ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loại sự kiện
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi phục vụ đa dạng các loại sự kiện với thực đơn phù hợp
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {eventTypes.map((event) => (
              <div key={event.id} className="text-center group cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, eventType: event.id }))}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                  formData.eventType === event.id 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600'
                }`}>
                  <i className={`${event.icon} text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {event.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Đặt tiệc ngay
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Điền thông tin để chúng tôi có thể tư vấn và chuẩn bị tốt nhất cho sự kiện của bạn
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập họ và tên"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Nhập email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng khách *
                </label>
                <select
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn số lượng khách</option>
                  <option value="10-20">10-20 người</option>
                  <option value="20-50">20-50 người</option>
                  <option value="50-100">50-100 người</option>
                  <option value="100+">100+ người</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày tổ chức *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ tổ chức *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm tổ chức *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ tổ chức sự kiện"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngân sách dự kiến
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Chọn ngân sách</option>
                <option value="under-1m">Dưới 1 triệu</option>
                <option value="1-3m">1-3 triệu</option>
                <option value="3-5m">3-5 triệu</option>
                <option value="5-10m">5-10 triệu</option>
                <option value="over-10m">Trên 10 triệu</option>
              </select>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Yêu cầu đặc biệt
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                placeholder="Mô tả chi tiết về sự kiện, món ăn yêu thích, yêu cầu đặc biệt..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <ButtonFilled
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              <i className="fas fa-paper-plane mr-2"></i>
              Gửi yêu cầu đặt tiệc
            </ButtonFilled>
          </form>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Dịch vụ đặt tiệc
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những dịch vụ chuyên nghiệp chúng tôi cung cấp cho sự kiện của bạn
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-utensils text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thực đơn đa dạng</h3>
              <p className="text-gray-600">Hơn 100 món ăn từ truyền thống đến hiện đại</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-truck text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Giao hàng tận nơi</h3>
              <p className="text-gray-600">Giao hàng đúng giờ với đội ngũ chuyên nghiệp</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-tie text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tư vấn chuyên nghiệp</h3>
              <p className="text-gray-600">Đội ngũ tư vấn giàu kinh nghiệm</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Đảm bảo chất lượng</h3>
              <p className="text-gray-600">Cam kết chất lượng và vệ sinh an toàn</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cần tư vấn thêm?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Liên hệ với chúng tôi để được tư vấn chi tiết về dịch vụ đặt tiệc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonFilled variant="primary" size="lg" className="px-8">
              <i className="fas fa-phone mr-2"></i>
              Gọi ngay: 1900 1234
            </ButtonFilled>
            <ButtonFilled variant="secondary" size="lg" className="px-8">
              <i className="fas fa-comment mr-2"></i>
              Chat với tư vấn viên
            </ButtonFilled>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPartyPage;
