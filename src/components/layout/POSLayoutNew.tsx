import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import SidebarCategory from '../pos/SidebarCategory';
import CartPanel from '../pos/CartPanel';
import { useCart } from '../../hooks/useCart';
import { useProducts } from '../../hooks/useProducts';
import { usePOSDisplaySync } from '../../hooks/useDisplaySync';

export default function POSLayoutNew() {
  const navigate = useNavigate();
  const { items, totalPrice, totalItems } = useCart();
  const { categories, setSelectedCategory } = useProducts();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');

  // Sync cart data to customer display
  usePOSDisplaySync(items, totalPrice, totalItems, 'creating');

  // Initialize category selection
  useEffect(() => {
    setSelectedCategory('all');
  }, [setSelectedCategory]);

  const handleBack = () => {
    navigate('/pos');
  };

  const handleCheckout = () => {
    if (totalItems > 0) {
      navigate('/checkout');
    }
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategoryId(categoryName);
    setSelectedCategory(categoryName);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              onClick={handleBack}
              className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Ocha Việt POS
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="lg:hidden bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 relative transition-colors"
            >
              <ShoppingCartIcon className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Left */}
      <aside className="hidden lg:block w-[280px] border-r overflow-y-auto bg-white shadow-sm pt-16">
        <div className="p-4">
          <SidebarCategory 
            categories={categories}
            selectedCategory={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 bg-gray-50">
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
      
      {/* Cart Panel - Right */}
      <aside className="hidden lg:block w-[320px] border-l overflow-y-auto bg-white shadow-sm pt-16">
        <div className="p-4">
          <CartPanel onCheckout={handleCheckout} />
        </div>
      </aside>

      {/* Mobile Cart Drawer */}
      {isCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Giỏ hàng</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <div className="p-4">
                <CartPanel onCheckout={() => {
                  setIsCartOpen(false);
                  handleCheckout();
                }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
