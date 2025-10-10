import React from 'react';
// import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/product/ProductGrid';
import SectionTitle from '../components/shared/SectionTitle';
import { useProducts } from '../hooks/useProducts';

const MenuPage: React.FC = () => {
  const { 
    products, 
    categories, 
    filteredProducts, 
    searchQuery, 
    selectedCategory, 
    sortBy,
    setSearchQuery, 
    setSelectedCategory,
    setSortBy
  } = useProducts();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };


  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'price' | 'rating' | 'popular');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Helmet>
        <title>Thực đơn | Phở Việt</title>
        <meta name="description" content="Khám phá thực đơn đa dạng với các món ăn ngon tại Phở Việt" />
      </Helmet> */}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Thực đơn</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Khám phá hơn 200 món ăn đa dạng từ truyền thống đến hiện đại
            </p>
            <div className="flex items-center justify-center space-x-8 text-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{products.length}</div>
                <div className="text-white/80">Món ăn</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">{categories.length}</div>
                <div className="text-white/80">Danh mục</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">4.8</div>
                <div className="text-white/80">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm món ăn..."
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tất cả
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sắp xếp:</label>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="popular">Phổ biến</option>
                <option value="name">Tên A-Z</option>
                <option value="price">Giá thấp đến cao</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Hiển thị {filteredProducts.length} trong {products.length} món
            {selectedCategory && (
              <span> trong {selectedCategory}</span>
            )}
            {searchQuery && (
              <span> khớp với "{searchQuery}"</span>
            )}
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          columns={4}
        />

        {/* Featured Categories */}
        <div className="mt-16">
          <SectionTitle
            title="Duyệt theo danh mục"
            subtitle="Khám phá các danh mục món ăn"
            centered
            className="mb-8"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="text-center cursor-pointer group"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="relative mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
