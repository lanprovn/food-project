import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategoryList from '../components/home/CategoryList';
import PopularItems from '../components/home/PopularItems';
// import FeaturedRestaurants from '../components/home/FeaturedRestaurants';
// import ProductGrid from '../components/product/ProductGrid';
import ButtonFilled from '../components/shared/ButtonFilled';
// import SectionTitle from '../components/shared/SectionTitle';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { products, categories, discountItems } = useProducts();
  const [popularProducts, setPopularProducts] = useState(products.slice(0, 5));
  const navigate = useNavigate();

  useEffect(() => {
    // Set popular products (first 5 products)
    setPopularProducts(products.slice(0, 5));
  }, [products]);

  const handleOrderClick = () => {
    navigate('/menu');
  };

  const howItWorks = [
    {
      icon: '/src/assets/img/gallery/location.png',
      title: 'Chọn địa điểm',
      description: 'Chọn địa điểm để giao món ăn của bạn.',
    },
    {
      icon: '/src/assets/img/gallery/order.png',
      title: 'Chọn món ăn',
      description: 'Xem qua hàng trăm thực đơn để chọn món ăn yêu thích',
    },
    {
      icon: '/src/assets/img/gallery/pay.png',
      title: 'Thanh toán',
      description: 'Nhanh chóng, an toàn và đơn giản. Chọn nhiều phương thức thanh toán',
    },
    {
      icon: '/src/assets/img/gallery/meals.png',
      title: 'Thưởng thức',
      description: 'Món ăn được chế biến và giao trực tiếp đến nhà bạn.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Discount Items */}
      <section className="py-16 md:py-20 bg-gray-50 scroll-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ưu đãi đặc biệt
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Khám phá những món ăn ngon với giá ưu đãi hấp dẫn, chỉ có trong thời gian giới hạn
            </p>
            <ButtonFilled
              variant="primary"
              size="md"
              onClick={() => navigate('/hot-deals')}
              className="inline-flex items-center"
            >
              <i className="fas fa-fire mr-2"></i>
              Xem tất cả Hot Deals
              <i className="fas fa-arrow-right ml-2"></i>
            </ButtonFilled>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {discountItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 border border-gray-100 group">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold">-{item.discount}%</div>
                      <div className="text-xs">GIẢM GIÁ</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                      <i className="fas fa-clock mr-1"></i>
                      Còn {item.daysRemaining} ngày
                    </span>
                    <ButtonFilled
                      variant="primary"
                      size="sm"
                      onClick={handleOrderClick}
                      className="px-4"
                    >
                      Đặt ngay
                    </ButtonFilled>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-br from-primary via-red-500 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Cách thức hoạt động
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Chỉ với 4 bước đơn giản, bạn có thể thưởng thức món ăn ngon ngay tại nhà
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center text-white group">
                <div className="relative mb-8">
                  <div className="w-32 h-32 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-white/80 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Items */}
      <div className="py-16 md:py-20">
        <PopularItems products={popularProducts} />
      </div>

      {/* Featured Restaurants - Removed */}

      {/* Search by Food */}
      <div className="py-16 md:py-20">
        <CategoryList categories={categories} />
      </div>

      {/* Statistics Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Phở Việt trong số liệu
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Những con số ấn tượng phản ánh chất lượng dịch vụ của chúng tôi
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">10K+</div>
              <div className="text-white/80">Khách hàng hài lòng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">50K+</div>
              <div className="text-white/80">Đơn hàng đã giao</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">200+</div>
              <div className="text-white/80">Món ăn đa dạng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2">30'</div>
              <div className="text-white/80">Thời gian giao hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn Phở Việt?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những lý do khiến chúng tôi trở thành lựa chọn hàng đầu của khách hàng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-clock text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Giao hàng siêu tốc</h3>
              <p className="text-gray-600">Cam kết giao hàng trong 30 phút, đảm bảo món ăn luôn nóng hổi và ngon miệng.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shield-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">An toàn tuyệt đối</h3>
              <p className="text-gray-600">Tuân thủ nghiêm ngặt các tiêu chuẩn vệ sinh an toàn thực phẩm quốc tế.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-utensils text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đầu bếp chuyên nghiệp</h3>
              <p className="text-gray-600">Đội ngũ đầu bếp giàu kinh nghiệm, chế biến món ăn theo công thức truyền thống.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-mobile-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đặt hàng dễ dàng</h3>
              <p className="text-gray-600">Giao diện thân thiện, đặt hàng chỉ với vài thao tác đơn giản trên điện thoại.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-headset text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hỗ trợ 24/7</h3>
              <p className="text-gray-600">Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-tags text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Giá cả hợp lý</h3>
              <p className="text-gray-600">Mức giá cạnh tranh, phù hợp với túi tiền của mọi đối tượng khách hàng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đăng ký nhận tin
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Nhận thông tin về khuyến mãi, món ăn mới và ưu đãi đặc biệt
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <ButtonFilled variant="primary" size="lg" className="px-8">
              <i className="fas fa-paper-plane mr-2"></i>
              Đăng ký
            </ButtonFilled>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-cover bg-center relative" style={{ backgroundImage: 'url(/src/assets/img/gallery/cta-one-bg.png)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="bg-white rounded-3xl p-8 shadow-xl max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <img src="/src/assets/img/icons/discounts.png" alt="Discounts" className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold text-gradient">Giảm giá hàng ngày</h3>
              </div>
              <div className="flex flex-col items-center">
                <img src="/src/assets/img/icons/live-tracking.png" alt="Live Tracking" className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold text-gradient">Theo dõi trực tiếp</h3>
              </div>
              <div className="flex flex-col items-center">
                <img src="/src/assets/img/icons/quick-delivery.png" alt="Quick Delivery" className="w-24 h-24 mb-4" />
                <h3 className="text-2xl font-bold text-gradient">Giao hàng nhanh</h3>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center mt-16">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <img
                src="/src/assets/img/gallery/phone-cta-one.png"
                alt="Mobile App"
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="lg:w-1/2 text-center lg:text-left text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Tải ứng dụng</h2>
              <p className="text-lg mb-6">
                Chưa bao giờ đặt món ăn lại dễ dàng đến thế. Tìm kiếm những ưu đãi tốt nhất và bạn sẽ đắm chìm trong thế giới ẩm thực tuyệt vời.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                  <img src="/src/assets/img/gallery/app-store.svg" alt="App Store" className="h-12" />
                </a>
                <a href="https://play.google.com/store/apps" target="_blank" rel="noopener noreferrer">
                  <img src="/src/assets/img/gallery/google-play.svg" alt="Google Play" className="h-12" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white scroll-slide-up">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hơn 10,000 khách hàng đã tin tưởng và hài lòng với dịch vụ của Phở Việt
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Minh Anh</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Giao hàng nhanh, món ăn ngon, giá cả hợp lý. Tôi đã đặt hàng ở đây nhiều lần và luôn hài lòng!"
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Thu Hà</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "App dễ sử dụng, thanh toán tiện lợi. Đặc biệt là phần theo dõi đơn hàng rất chi tiết và chính xác."
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  H
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Hoàng Nam</h4>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>
                    <span className="text-sm text-gray-500 ml-2">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Đa dạng món ăn, từ món Việt đến món Âu. Chất lượng đồ ăn luôn đảm bảo và tươi ngon."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Phở Việt trong số liệu
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Những con số ấn tượng phản ánh chất lượng dịch vụ của chúng tôi
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-white/80">Khách hàng hài lòng</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Đơn hàng đã giao</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-white/80">Nhà hàng đối tác</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">30'</div>
              <div className="text-white/80">Thời gian giao trung bình</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white scroll-fade-in">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn Phở Việt?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những lý do khiến chúng tôi trở thành lựa chọn hàng đầu của khách hàng
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-shipping-fast text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Giao hàng siêu tốc</h3>
              <p className="text-gray-600 leading-relaxed">
                Cam kết giao hàng trong 30 phút với đội ngũ shipper chuyên nghiệp và hệ thống định vị GPS chính xác
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">An toàn tuyệt đối</h3>
              <p className="text-gray-600 leading-relaxed">
                Đảm bảo vệ sinh an toàn thực phẩm với quy trình kiểm soát chất lượng nghiêm ngặt từ khâu chế biến đến giao hàng
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-credit-card text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Thanh toán đa dạng</h3>
              <p className="text-gray-600 leading-relaxed">
                Hỗ trợ nhiều phương thức thanh toán: tiền mặt, thẻ, ví điện tử với hệ thống bảo mật cao cấp
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-headset text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hỗ trợ 24/7</h3>
              <p className="text-gray-600 leading-relaxed">
                Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc mọi nơi với thái độ nhiệt tình và chuyên nghiệp
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-gift text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ưu đãi hấp dẫn</h3>
              <p className="text-gray-600 leading-relaxed">
                Chương trình khuyến mãi đa dạng, tích điểm đổi quà và nhiều ưu đãi đặc biệt cho khách hàng thân thiết
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <i className="fas fa-map-marker-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Phủ sóng rộng</h3>
              <p className="text-gray-600 leading-relaxed">
                Dịch vụ giao hàng tại hơn 20 quận/huyện tại TP.HCM với mạng lưới đối tác nhà hàng đa dạng
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-cover bg-center relative" style={{ backgroundImage: 'url(/src/assets/img/gallery/cta-two-bg.png)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Bạn đã sẵn sàng đặt hàng<br />với những ưu đãi tốt nhất?
          </h2>
          <ButtonFilled variant="primary" size="lg" onClick={handleOrderClick}>
            ĐẶT HÀNG NGAY <i className="fas fa-chevron-right ml-2"></i>
          </ButtonFilled>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
