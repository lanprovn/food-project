import React from 'react';
import type { CartItem as CartItemType } from '../../types/cart';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.product.id);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
      <div className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500">{item.product.restaurant}</p>
        <p className="text-sm font-medium text-gray-900">
          {formatPrice(item.product.price)}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <i className="fas fa-minus text-xs"></i>
        </button>
        
        <span className="w-8 text-center font-medium">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
        >
          <i className="fas fa-plus text-xs"></i>
        </button>
        
        <button
          onClick={handleRemove}
          className="ml-2 text-red-500 hover:text-red-700 transition-colors"
        >
          <i className="fas fa-trash text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
