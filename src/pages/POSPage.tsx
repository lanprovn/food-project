import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/pos/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';
import StockAlertsPanel from '../components/shared/StockAlertsPanel';
import StockInitializer from '../components/shared/StockInitializer';

/**
 * POSPage Component
 * Main Point of Sale interface for product selection and ordering
 * Features:
 * - Product grid display with category filtering
 * - Mobile-responsive category navigation
 * - Loading states and error handling
 */
const POSPage: React.FC = () => {
  const { filteredProducts, setSelectedCategory, isLoading } = useProducts();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Set initial category to show all products
    setSelectedCategory('all');
  }, [setSelectedCategory]);

  /**
   * Handle category selection for mobile filter
   * @param categoryName - Name of the selected category
   */
  const handleCategorySelect = (categoryName: string): void => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryName);
  };

  return (
    <div className="w-full">
      <StockInitializer />
      <StockAlertsPanel />
      
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

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Hệ thống Order
            </h2>
            <p className="text-lg text-gray-600">
              Chọn món ăn và thức uống từ menu bên dưới
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            📊
            <span>Doanh Thu</span>
          </button>
        </div>
      </div>
      
      {/* Product Content */}
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
