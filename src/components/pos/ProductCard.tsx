import React from 'react';
import type { Product } from '../../types/product';
import { StarIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-100 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/src/assets/img/gallery/default-food.png';
          }}
        />
        
        {/* Popular Badge */}
        {product.isPopular && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Phổ biến
          </div>
        )}
        
        {/* Stock Badge */}
        {product.stock && product.stock < 10 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Sắp hết
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600 font-medium">
            {product.rating}
          </span>
          <span className="text-xs text-gray-500 ml-1">
            ({product.restaurant})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">
            {formatPrice(product.price)}
          </span>
          
          {/* Size Options Indicator */}
          {product.sizes && product.sizes.length > 0 && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.sizes.length} size
            </span>
          )}
        </div>

        {/* Topping Options Indicator */}
        {product.toppings && product.toppings.length > 0 && (
          <div className="mt-2">
            <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded-full">
              {product.toppings.length} topping
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
