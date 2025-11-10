import React, { memo, useCallback } from 'react';
import type { Product } from '../../../../types/product';
import { formatPrice } from '../../../../utils/formatPrice';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden cursor-pointer min-h-[44px] min-w-[44px] group"
      style={{
        willChange: 'transform, box-shadow',
        transform: 'translateZ(0)',
        transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.03) translateZ(0)';
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateZ(0)';
        e.currentTarget.style.boxShadow = '';
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(0.98) translateZ(0)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.03) translateZ(0)';
      }}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{
            willChange: 'transform',
            transform: 'translateZ(0)',
            transition: 'transform 0.5s ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25) rotate(2deg) translateZ(0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(0)';
          }}
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
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md z-10"
          style={{
            willChange: 'transform, background-color',
            transform: 'translateZ(0)',
            transition: 'transform 0.3s ease-out, background-color 0.3s ease-out',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25) rotate(12deg) translateZ(0)';
            e.currentTarget.style.backgroundColor = 'rgb(255 237 213)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(0)';
            e.currentTarget.style.backgroundColor = '';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.95) translateZ(0)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.25) rotate(12deg) translateZ(0)';
          }}
          title="Xem chi tiết"
        >
          <svg 
            className="w-4 h-4 text-gray-600" 
            style={{
              transition: 'color 0.3s ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgb(234 88 12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
            }}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        
        {/* Popular Badge */}
        {product.isPopular && (
          <div 
            className="absolute top-2 left-2 inline-flex items-center px-2 py-1 rounded text-xs font-semibold leading-none bg-[#ff5a3c] text-white shadow-lg"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
              animation: 'pulse-opacity 2s ease-in-out infinite',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(0)';
            }}
          >
            Phổ biến
          </div>
        )}
        
        {/* Stock Badge */}
        {product.stock && product.stock < 10 && (
          <div 
            className="absolute bottom-2 left-2 inline-flex items-center px-2 py-1 rounded text-xs font-semibold leading-none bg-[#ef4444] text-white shadow-lg"
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              transition: 'transform 0.3s ease-out',
              animation: 'bounce-slow 2s ease-in-out infinite',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(0)';
            }}
          >
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
          <span 
            className="text-lg font-bold text-[#ff5a3c]"
            style={{
              willChange: 'transform, color',
              transform: 'translateZ(0)',
              transition: 'transform 0.3s ease-out, color 0.3s ease-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
              e.currentTarget.style.color = 'rgb(234 88 12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateZ(0)';
              e.currentTarget.style.color = '';
            }}
          >
            {formatPrice(product.price)}
          </span>
          
          {/* Size Options Indicator */}
          {product.sizes && product.sizes.length > 0 && (
            <span 
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600"
              style={{
                willChange: 'transform, background-color, color',
                transform: 'translateZ(0)',
                transition: 'transform 0.3s ease-out, background-color 0.3s ease-out, color 0.3s ease-out',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
                e.currentTarget.style.backgroundColor = 'rgb(255 237 213)';
                e.currentTarget.style.color = 'rgb(234 88 12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateZ(0)';
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = '';
              }}
            >
              {product.sizes.length} size
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

// Add CSS animations with GPU acceleration
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px) translateZ(0);
    }
    to {
      opacity: 1;
      transform: translateY(0) translateZ(0);
    }
  }
  
  @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(0) translateZ(0);
    }
    50% {
      transform: translateY(-3px) translateZ(0);
    }
  }
  
  @keyframes pulse-opacity {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out;
    will-change: transform, opacity;
    transform: translateZ(0);
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
    will-change: transform;
    transform: translateZ(0);
  }
`;
if (!document.head.querySelector('style[data-product-card-animations]')) {
  style.setAttribute('data-product-card-animations', 'true');
  document.head.appendChild(style);
}

export default ProductCard;

