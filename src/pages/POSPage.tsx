import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarCategory from '../components/pos/SidebarCategory';
import ProductGrid from '../components/pos/ProductGrid';
import CartPanel from '../components/pos/CartPanel';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const POSPage: React.FC = () => {
  const navigate = useNavigate();
  const { categories, filteredProducts, setSelectedCategory } = useProducts();
  const { totalItems } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  useEffect(() => {
    // Set initial category to show all products
    setSelectedCategory('all');
  }, [setSelectedCategory]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryId(categoryName);
  };

  const handleCheckout = () => {
    if (totalItems > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#fff8f5]">
      {/* Sidebar Categories */}
      <SidebarCategory 
        categories={categories}
        selectedCategory={selectedCategoryId}
        onCategorySelect={handleCategorySelect}
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Phở Việt - Hệ thống POS
            </h1>
            <p className="text-gray-600">
              Chọn món ăn và thức uống từ menu bên dưới
            </p>
          </div>
          
          <ProductGrid products={filteredProducts} />
        </div>
      </main>
      
      {/* Cart Panel */}
      <CartPanel onCheckout={handleCheckout} />
    </div>
  );
};

export default POSPage;
