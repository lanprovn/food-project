import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';

interface CartPanelProps {
  onCheckout: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ onCheckout }) => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getSizeText = (size?: { name: string; extraPrice: number }) => {
    if (!size) return '';
    return size.extraPrice > 0 ? `${size.name} (+${formatPrice(size.extraPrice)})` : size.name;
  };

  const getToppingsText = (toppings: Array<{ name: string; extraPrice: number }>) => {
    if (toppings.length === 0) return '';
    return toppings.map(t => t.extraPrice > 0 ? `${t.name} (+${formatPrice(t.extraPrice)})` : t.name).join(', ');
  };

  return (
    <div className="w-96 bg-white shadow-lg border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <ShoppingCartIcon className="h-6 w-6 mr-2" />
            Giỏ hàng
          </h2>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
            {totalItems} món
          </span>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Chưa có món nào
            </h3>
            <p className="text-gray-500 text-sm">
              Chọn món từ menu để thêm vào giỏ hàng
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                {/* Item Image and Name */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/src/assets/img/gallery/default-food.png';
                    }}
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">
                      {item.name}
                    </h4>
                    
                    {/* Size */}
                    {item.selectedSize && (
                      <p className="text-xs text-gray-600 mb-1">
                        Size: {getSizeText(item.selectedSize)}
                      </p>
                    )}
                    
                    {/* Toppings */}
                    {item.selectedToppings.length > 0 && (
                      <p className="text-xs text-gray-600 mb-1">
                        Topping: {getToppingsText(item.selectedToppings)}
                      </p>
                    )}
                    
                    {/* Note */}
                    {item.note && (
                      <p className="text-xs text-gray-600 mb-1">
                        Ghi chú: {item.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity and Price Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-semibold text-gray-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600">
                      {formatPrice(item.totalPrice)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-800">Tổng cộng:</span>
            <span className="text-2xl font-bold text-orange-600">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPanel;
