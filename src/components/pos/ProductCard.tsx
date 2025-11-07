import React, { memo, useCallback } from 'react';
import type { Product } from '../../types/product';

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
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer min-h-[44px] min-w-[44px] transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.03] active:scale-[0.98] animate-fade-in-up group"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-2"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/src/assets/img/gallery/default-food.png';
          }}
        />
        
        {/* Info Icon - Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-125 active:scale-95 hover:rotate-12 hover:bg-orange-100 z-10"
          title="Xem chi tiết"
        >
          <svg className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        {/* Popular Badge */}
        {product.isPopular && (
          <div className="absolute top-2 left-2 inline-flex items-center px-2 py-1 rounded text-xs font-semibold leading-none bg-[#ff5a3c] text-white animate-pulse shadow-lg transition-all duration-300 hover:scale-110">
            Phổ biến
          </div>
        )}
        
        {/* Stock Badge */}
        {product.stock && product.stock < 10 && (
          <div className="absolute bottom-2 left-2 inline-flex items-center px-2 py-1 rounded text-xs font-semibold leading-none bg-[#ef4444] text-white animate-bounce-slow shadow-lg transition-all duration-300 hover:scale-110">
            Sắp hết
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 text-base mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Price - Prominent */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-[#ff5a3c] transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600">
            {formatPrice(product.price)}
          </span>
          
          {/* Size Options Indicator */}
          {product.sizes && product.sizes.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 transition-all duration-300 group-hover:bg-orange-100 group-hover:text-orange-600 group-hover:scale-110">
              {product.sizes.length} size
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
`;
if (!document.head.querySelector('style[data-product-card-animations]')) {
  style.setAttribute('data-product-card-animations', 'true');
  document.head.appendChild(style);
}

export default ProductCard;
