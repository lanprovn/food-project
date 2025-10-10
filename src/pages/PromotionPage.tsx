import React, { useState } from 'react';
import ButtonFilled from '../components/shared/ButtonFilled';
import { useNavigate } from 'react-router-dom';

const PromotionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');

  const promotions = [
    {
      id: 1,
      title: "Combo Gia Đình Siêu Tiết Kiệm",
      description: "Combo 4 người với giá chỉ 299.000₫ - Tiết kiệm đến 50%",
      image: "/src/assets/img/gallery/fried-chicken.png",
      discount: "50%",
      validUntil: "31/12/2024",
      category: "combo",
      featured: true
    },
    {
      id: 2,
      title: "Mua 1 Tặng 1 - Pizza Weekend",
      description: "Mua 1 pizza bất kỳ, tặng ngay 1 pizza cùng loại",
      image: "/src/assets/img/gallery/pizza.png",
      discount: "50%",
      validUntil: "Chỉ cuối tuần",
      category: "pizza",
      featured: false
    },
    {
      id: 3,
      title: "Burger Thứ 2 - Giá Sốc",
      description: "Tất cả burger chỉ từ 39.000₫ vào thứ 2 hàng tuần",
      image: "/src/assets/img/gallery/burger.png",
      discount: "40%",
      validUntil: "Mỗi thứ 2",
      category: "burger",
      featured: false
    },
    {
      id: 4,
      title: "Phở Bò Đặc Biệt - Ưu Đãi",
      description: "Phở bò đặc biệt chỉ 45.000₫ thay vì 65.000₫",
      image: "/src/assets/img/gallery/noodles.png",
      discount: "30%",
      validUntil: "30/11/2024",
      category: "noodles",
      featured: true
    },
    {
      id: 5,
      title: "Đồ Uống Mùa Hè",
      description: "Tất cả đồ uống lạnh giảm 25% từ 14h-17h",
      image: "/src/assets/img/gallery/dancake.png",
      discount: "25%",
      validUntil: "Hàng ngày",
      category: "drinks",
      featured: false
    },
    {
      id: 6,
      title: "Combo Sinh Nhật",
      description: "Combo sinh nhật cho 6-8 người với giá đặc biệt",
      image: "/src/assets/img/gallery/toffes-cake.png",
      discount: "35%",
      validUntil: "Đặt trước 3 ngày",
      category: "combo",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Tất cả', count: promotions.length },
    { id: 'combo', name: 'Combo', count: promotions.filter(p => p.category === 'combo').length },
    { id: 'pizza', name: 'Pizza', count: promotions.filter(p => p.category === 'pizza').length },
    { id: 'burger', name: 'Burger', count: promotions.filter(p => p.category === 'burger').length },
    { id: 'noodles', name: 'Mì & Phở', count: promotions.filter(p => p.category === 'noodles').length },
    { id: 'drinks', name: 'Đồ uống', count: promotions.filter(p => p.category === 'drinks').length },
  ];

  const filteredPromotions = activeTab === 'all' 
    ? promotions 
    : promotions.filter(promo => promo.category === activeTab);

  const featuredPromotions = promotions.filter(promo => promo.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <i className="fas fa-gift mr-2 text-yellow-300"></i>
              Khuyến mãi đặc biệt
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              KHUYẾN MÃI
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Những ưu đãi hấp dẫn nhất từ Phở Việt - Tiết kiệm tối đa cho bữa ăn của bạn
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{promotions.length}</div>
                <div className="text-white/80">Ưu đãi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50%</div>
                <div className="text-white/80">Giảm tối đa</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-white/80">Áp dụng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Promotions */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ưu đãi nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những khuyến mãi đặc biệt được yêu thích nhất
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPromotions.map((promo) => (
              <div key={promo.id} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200 hover-lift">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </div>
                  <div className="md:w-2/3 md:pl-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                        {promo.discount} OFF
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        <i className="fas fa-star mr-1"></i>
                        Nổi bật
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{promo.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <i className="fas fa-clock mr-1"></i>
                        Áp dụng đến: {promo.validUntil}
                      </div>
                      <ButtonFilled
                        variant="primary"
                        size="md"
                        onClick={() => navigate('/menu')}
                      >
                        Đặt ngay
                      </ButtonFilled>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tất cả khuyến mãi</h2>
            <div className="text-sm text-gray-500">
              {filteredPromotions.length} ưu đãi
            </div>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  activeTab === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          {filteredPromotions.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy khuyến mãi</h3>
              <p className="text-gray-500">Hãy thử chọn danh mục khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPromotions.map((promo) => (
                <div key={promo.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 hover-lift">
                  <div className="relative">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        {promo.discount} OFF
                      </span>
                    </div>
                    {promo.featured && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          <i className="fas fa-star mr-1"></i>
                          Nổi bật
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{promo.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <i className="fas fa-clock mr-1"></i>
                        {promo.validUntil}
                      </div>
                      <ButtonFilled
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/menu')}
                        className="px-4"
                      >
                        Đặt ngay
                      </ButtonFilled>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Đừng bỏ lỡ những khuyến mãi tuyệt vời!
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Đăng ký nhận thông báo để không bỏ lỡ bất kỳ khuyến mãi nào từ Phở Việt
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

export default PromotionPage;
