import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/product/ProductGrid';
import SectionTitle from '../components/shared/SectionTitle';
import ButtonFilled from '../components/shared/ButtonFilled';
import { useProducts } from '../hooks/useProducts';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();
  const { 
    filteredProducts, 
    categories, 
    setSelectedCategory,
    sortBy,
    setSortBy,
    isLoading 
  } = useProducts();

  useEffect(() => {
    if (categoryName) {
      setSelectedCategory(categoryName);
    }
  }, [categoryName, setSelectedCategory]);

  const currentCategory = categories.find(cat => 
    cat.name.toLowerCase() === categoryName?.toLowerCase()
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'price' | 'rating' | 'popular');
  };

  const handleBackToMenu = () => {
    navigate('/menu');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* <Helmet>
        <title>{currentCategory?.name || 'Danh mục'} | Phở Việt</title>
        <meta name="description" content={`Khám phá các món ăn ${currentCategory?.name || 'ngon'} tại Phở Việt`} />
      </Helmet> */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {currentCategory?.name || 'Danh mục'}
              </h1>
              <p className="text-gray-600 text-lg">
                {currentCategory?.description || 'Khám phá các món ăn ngon trong danh mục này'}
              </p>
            </div>
            <ButtonFilled 
              onClick={handleBackToMenu}
              variant="secondary"
              size="md"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Quay lại thực đơn
            </ButtonFilled>
          </div>

          {/* Category Info */}
          {currentCategory && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={currentCategory.image}
                  alt={currentCategory.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {currentCategory.name}
                  </h2>
                  <p className="text-gray-600">
                    {filteredProducts.length} sản phẩm có sẵn
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sắp xếp theo:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="popular">Phổ biến</option>
                <option value="rating">Đánh giá cao</option>
                <option value="price">Giá thấp đến cao</option>
                <option value="name">Tên A-Z</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              Hiển thị {filteredProducts.length} sản phẩm
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid 
            products={filteredProducts} 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          />
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-search text-6xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Không tìm thấy sản phẩm
            </h3>
            <p className="text-gray-600 mb-6">
              Không có sản phẩm nào trong danh mục "{currentCategory?.name}"
            </p>
            <ButtonFilled onClick={handleBackToMenu} variant="primary" size="lg">
              Xem tất cả sản phẩm
            </ButtonFilled>
          </div>
        )}

        {/* Popular Products Section */}
        {filteredProducts.length > 0 && (
          <div className="mt-16">
            <SectionTitle
              title="Món ăn nổi bật"
              subtitle="Những món ăn được yêu thích nhất"
              className="text-center mb-8"
            />
            <ProductGrid 
              products={filteredProducts.filter(p => p.isPopular).slice(0, 4)} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
