import React, { memo, useCallback } from 'react';
import type { Product } from '../../types/product';
import { StarIcon } from '@heroicons/react/24/solid';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, onClick }) => {
  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }, []);

  return (
    <div
      onClick={onClick}
      className="pos-card-interactive pos-touch-target"
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
          <div className="absolute top-3 left-3 pos-badge-primary">
            Phổ biến
          </div>
        )}
        
        {/* Stock Badge */}
        {product.stock && product.stock < 10 && (
          <div className="absolute top-3 right-3 pos-badge-danger">
            Sắp hết
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 pos-body-lg mb-2 pos-line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 pos-body-sm mb-3 pos-line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="pos-body-sm text-gray-600 font-medium">
            {product.rating}
          </span>
          <span className="pos-caption text-gray-500 ml-1">
            ({product.restaurant})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="pos-heading-3 text-primary">
            {formatPrice(product.price)}
          </span>
          
          {/* Size Options Indicator */}
          {product.sizes && product.sizes.length > 0 && (
            <span className="pos-badge-gray">
              {product.sizes.length} size
            </span>
          )}
        </div>

        {/* Topping Options Indicator */}
        {product.toppings && product.toppings.length > 0 && (
          <div className="mt-2">
            <span className="pos-badge bg-blue-100 text-blue-700">
              {product.toppings.length} topping
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
