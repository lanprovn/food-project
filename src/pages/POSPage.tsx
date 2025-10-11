import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/pos/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const POSPage: React.FC = () => {
  const { filteredProducts, setSelectedCategory, isLoading } = useProducts();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  useEffect(() => {
    // Set initial category to show all products
    setSelectedCategory('all');
  }, [setSelectedCategory]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryName);
  };

  return (
    <div className="w-full">
      {/* Mobile Category Filter */}
      <div className="lg:hidden mb-6">
        <div className="flex overflow-x-auto pb-2">
          <button
            onClick={() => handleCategorySelect('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full mr-2 transition-all duration-300 ${
              selectedCategoryId === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Hệ thống Order
        </h2>
        <p className="text-lg text-gray-600">
          Chọn món ăn và thức uống từ menu bên dưới
        </p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  );
};

export default POSPage;
