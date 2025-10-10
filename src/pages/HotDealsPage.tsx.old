import React, { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import ButtonFilled from '../components/shared/ButtonFilled';
import { useProducts } from '../hooks/useProducts';

const HotDealsPage: React.FC = () => {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter products with discounts
  const hotDeals = products.filter(product => product.discount && product.discount > 0);
  
  const categories = [
    { id: 'all', name: 'Tất cả', count: hotDeals.length },
    { id: 'pizza', name: 'Pizza', count: hotDeals.filter(p => p.category === 'Pizza').length },
    { id: 'burger', name: 'Burger', count: hotDeals.filter(p => p.category === 'Burger').length },
    { id: 'noodles', name: 'Mì & Phở', count: hotDeals.filter(p => p.category === 'Noodles').length },
    { id: 'drinks', name: 'Đồ uống', count: hotDeals.filter(p => p.category === 'Đồ Uống Lạnh').length },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? hotDeals 
    : hotDeals.filter(product => product.category.toLowerCase().includes(selectedCategory));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <i className="fas fa-fire mr-2 text-yellow-300"></i>
              Ưu đãi đặc biệt
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              HOT DEALS
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Khám phá những món ăn ngon với giá ưu đãi hấp dẫn, chỉ có trong thời gian giới hạn
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50+</div>
                <div className="text-white/80">Món ăn</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">30%</div>
                <div className="text-white/80">Giảm giá</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24h</div>
                <div className="text-white/80">Còn lại</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Danh mục ưu đãi</h2>
            <div className="text-sm text-gray-500">
              {filteredProducts.length} món ăn
            </div>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
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

      {/* Hot Deals Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-search text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy ưu đãi</h3>
              <p className="text-gray-500">Hãy thử chọn danh mục khác</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="relative">
                  {/* Hot Deal Badge */}
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      HOT DEAL
                    </div>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  </div>
                  
                  <ProductCard product={product} className="hover-lift" />
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
            Đừng bỏ lỡ những ưu đãi tuyệt vời!
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Đăng ký nhận thông báo để không bỏ lỡ bất kỳ ưu đãi nào từ Phở Việt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <ButtonFilled variant="primary" size="lg" className="px-8">
              <i className="fas fa-bell mr-2"></i>
              Đăng ký ngay
            </ButtonFilled>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shipping-fast text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Giao hàng nhanh</h3>
              <p className="text-gray-600">Cam kết giao hàng trong 30 phút</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">An toàn tuyệt đối</h3>
              <p className="text-gray-600">Đảm bảo vệ sinh an toàn thực phẩm</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-credit-card text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thanh toán đa dạng</h3>
              <p className="text-gray-600">Nhiều phương thức thanh toán tiện lợi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotDealsPage;
