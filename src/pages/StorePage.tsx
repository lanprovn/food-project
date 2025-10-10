import React, { useState } from 'react';
import ButtonFilled from '../components/shared/ButtonFilled';

const StorePage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stores = [
    {
      id: 1,
      name: "Phở Việt Quận 1",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "028 3822 1234",
      hours: "7:00 - 22:00",
      status: "open",
      city: "hcm",
      features: ["Giao hàng", "Mang về", "Ăn tại chỗ"],
      rating: 4.8,
      image: "/src/assets/img/gallery/food-world.png"
    },
    {
      id: 2,
      name: "Phở Việt Quận 3",
      address: "456 Võ Văn Tần, Quận 3, TP.HCM",
      phone: "028 3822 5678",
      hours: "7:00 - 22:00",
      status: "open",
      city: "hcm",
      features: ["Giao hàng", "Mang về", "Ăn tại chỗ"],
      rating: 4.7,
      image: "/src/assets/img/gallery/food-world.png"
    },
    {
      id: 3,
      name: "Phở Việt Quận 7",
      address: "789 Nguyễn Thị Thập, Quận 7, TP.HCM",
      phone: "028 3822 9012",
      hours: "7:00 - 22:00",
      status: "open",
      city: "hcm",
      features: ["Giao hàng", "Mang về", "Ăn tại chỗ"],
      rating: 4.9,
      image: "/src/assets/img/gallery/food-world.png"
    },
    {
      id: 4,
      name: "Phở Việt Ba Đình",
      address: "321 Hoàng Hoa Thám, Ba Đình, Hà Nội",
      phone: "024 3822 3456",
      hours: "7:00 - 22:00",
      status: "open",
      city: "hanoi",
      features: ["Giao hàng", "Mang về", "Ăn tại chỗ"],
      rating: 4.6,
      image: "/src/assets/img/gallery/food-world.png"
    },
    {
      id: 5,
      name: "Phở Việt Cầu Giấy",
      address: "654 Trần Duy Hưng, Cầu Giấy, Hà Nội",
      phone: "024 3822 7890",
      hours: "7:00 - 22:00",
      status: "open",
      city: "hanoi",
      features: ["Giao hàng", "Mang về", "Ăn tại chỗ"],
      rating: 4.8,
      image: "/src/assets/img/gallery/food-world.png"
    },
    {
      id: 6,
      name: "Phở Việt Hải Châu",
      address: "987 Lê Duẩn, Hải Châu, Đà Nẵng",
      phone: "0236 3822 1111",
      hours: "7:00 - 22:00",
      status: "open",
      city: "danang",
      features: ["Giao hàng", "Mang về", "Ăn tại chỗ"],
      rating: 4.7,
      image: "/src/assets/img/gallery/food-world.png"
    }
  ];

  const cities = [
    { id: 'all', name: 'Tất cả thành phố', count: stores.length },
    { id: 'hcm', name: 'TP. Hồ Chí Minh', count: stores.filter(s => s.city === 'hcm').length },
    { id: 'hanoi', name: 'Hà Nội', count: stores.filter(s => s.city === 'hanoi').length },
    { id: 'danang', name: 'Đà Nẵng', count: stores.filter(s => s.city === 'danang').length },
  ];

  const filteredStores = stores.filter(store => {
    const matchesCity = selectedCity === 'all' || store.city === selectedCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          store.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <i className="fas fa-store mr-2 text-yellow-300"></i>
              Tìm cửa hàng
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              CỬA HÀNG
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Tìm cửa hàng Phở Việt gần bạn nhất và thưởng thức những món ăn ngon tuyệt vời
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{stores.length}</div>
                <div className="text-white/80">Cửa hàng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">3</div>
                <div className="text-white/80">Thành phố</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-white/80">Giao hàng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm cửa hàng theo tên hoặc địa chỉ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedCity === city.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="font-medium">{city.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCity === city.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {city.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Danh sách cửa hàng</h2>
            <div className="text-sm text-gray-500">
              {filteredStores.length} cửa hàng
            </div>
          </div>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {filteredStores.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy cửa hàng</h3>
              <p className="text-gray-500">Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <div key={store.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 hover-lift">
                  <div className="relative">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        store.status === 'open' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {store.status === 'open' ? 'Đang mở' : 'Đã đóng'}
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                        <i className="fas fa-star text-yellow-400 text-sm mr-1"></i>
                        <span className="text-sm font-medium">{store.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{store.name}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <i className="fas fa-phone mr-2 text-orange-500"></i>
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <i className="fas fa-clock mr-2 text-orange-500"></i>
                        <span>{store.hours}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {store.features.map((feature, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <ButtonFilled
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      >
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        Chỉ đường
                      </ButtonFilled>
                      <ButtonFilled
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        <i className="fas fa-phone mr-2"></i>
                        Gọi ngay
                      </ButtonFilled>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bản đồ cửa hàng
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Xem vị trí tất cả cửa hàng Phở Việt trên bản đồ
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <i className="fas fa-map text-4xl mb-4"></i>
              <p className="text-lg">Bản đồ sẽ được tích hợp ở đây</p>
              <p className="text-sm">Google Maps API</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Không tìm thấy cửa hàng gần bạn?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Chúng tôi đang mở rộng mạng lưới cửa hàng. Đăng ký để nhận thông báo khi có cửa hàng mới
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <ButtonFilled variant="primary" size="lg" className="px-8">
              <i className="fas fa-bell mr-2"></i>
              Đăng ký ngay
            </ButtonFilled>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;
