import React from 'react';
import { useCart } from '../../hooks/useCart';
import CartItem from '../cart/CartItem';
import CartSummary from '../cart/CartSummary';
import ButtonFilled from '../shared/ButtonFilled';
import { useNavigate } from 'react-router-dom';

const SidebarCart: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, clearCart, totalItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <i className="fas fa-shopping-cart text-white"></i>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Giỏ hàng
              </h2>
              <p className="text-sm text-gray-500">
                {items.length} món • {totalItems} sản phẩm
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                title="Xóa tất cả"
              >
                <i className="fas fa-trash mr-1"></i>
                Xóa tất cả
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              title="Đóng giỏ hàng"
            >
              <i className="fas fa-times text-gray-500"></i>
            </button>
          </div>
        </div>
        
        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="fas fa-shopping-cart text-gray-400 text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Giỏ hàng trống</h3>
              <p className="text-gray-500 mb-6">Hãy thêm món ăn yêu thích vào giỏ hàng</p>
              <ButtonFilled
                variant="primary"
                size="md"
                onClick={() => {
                  handleClose();
                  navigate('/menu');
                }}
                className="px-6"
              >
                <i className="fas fa-utensils mr-2"></i>
                Xem thực đơn
              </ButtonFilled>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>
        
        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50">
            <CartSummary onCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarCart;
