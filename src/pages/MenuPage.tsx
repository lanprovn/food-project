import React from 'react';
import { Link } from 'react-router-dom';
import SidebarCategory from '../components/pos/SidebarCategory';
import ProductGrid from '../components/pos/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

const MenuPage: React.FC = () => {
  const { categories, filteredProducts, setSelectedCategory } = useProducts();
  const { totalItems } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>('all');

  React.useEffect(() => {
    // Set initial category to show all products
    setSelectedCategory('all');
  }, [setSelectedCategory]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryName);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="pos-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="pos-heading-2 pos-text-gradient">
                Ocha Việt
              </Link>
            </div>
            
            <div className="flex items-center pos-space-sm">
              <Link
                to="/pos"
                className="pos-btn pos-btn-primary pos-btn-md"
              >
                Mở POS
              </Link>
              
              {totalItems > 0 && (
                <Link
                  to="/checkout"
                  className="pos-btn pos-btn-success pos-btn-md flex items-center"
                >
                  <span>Giỏ hàng ({totalItems})</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Categories - Fixed */}
        <div className="w-64 bg-white shadow-sm flex-shrink-0 h-full overflow-y-auto pos-scrollbar-hide">
          <SidebarCategory 
            categories={categories}
            selectedCategory={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        
        {/* Main Content - Scrollable */}
        <main className="flex-1 p-6 overflow-y-auto h-full pos-scrollbar-hide">
          <div className="pos-container">
            <div className="pos-section">
              <h1 className="pos-heading-1 text-gray-800 mb-2">
                Thực đơn Ocha Việt
              </h1>
              <p className="pos-body-lg text-gray-600 mb-6">
                Khám phá các món ăn và thức uống ngon của chúng tôi
              </p>
            </div>
            
            <ProductGrid products={filteredProducts} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuPage;