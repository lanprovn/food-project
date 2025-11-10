import React from 'react';
import type { Product } from '../../../../types/product';
import { formatPrice } from '../../../../utils/formatPrice';
import { getProductStock, getStockStatus, getStockStatusColor, getStockStatusIcon } from '../../../../utils/stockManagement';

interface ProductCardWithStockProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCardWithStock: React.FC<ProductCardWithStockProps> = ({ product, onAddToCart }) => {
  const stock = getProductStock(String(product.id));
  const stockStatus = stock ? getStockStatus(stock) : 'in_stock';
  const statusColor = getStockStatusColor(stockStatus);
  const statusIcon = getStockStatusIcon(stockStatus);
  const isOutOfStock = stockStatus === 'out_of_stock';

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddToCart(product);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md ${
      isOutOfStock ? 'opacity-60' : 'hover:scale-105'
    }`}>
      {/* Product Image */}
      <div className="aspect-w-16 aspect-h-12 bg-gray-200 relative">
        <img
          src={product.image || '/placeholder-food.jpg'}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-food.jpg';
          }}
        />
        
        {/* Stock Status Badge */}
        {stock && (
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              stockStatus === 'in_stock' ? 'bg-green-100 text-green-800' :
              stockStatus === 'low_stock' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {statusIcon} {stock.currentStock} {stock.unit}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Stock Information */}
        {stock && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tồn kho:</span>
              <span className={`font-medium ${statusColor}`}>
                {stock.currentStock} {stock.unit}
              </span>
            </div>
            
            {stockStatus === 'low_stock' && (
              <div className="mt-1 text-xs text-yellow-600">
                ⚠️ Sắp hết hàng (tối thiểu: {stock.minStock})
              </div>
            )}
            
            {stockStatus === 'out_of_stock' && (
              <div className="mt-1 text-xs text-red-600">
                ❌ Hết hàng
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-orange-500">
            {formatPrice(product.price)}
          </span>
          
          {/* Size Options */}
          {product.sizes && product.sizes.length > 0 && (
            <span className="text-sm text-gray-500">
              {product.sizes.length} size
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
        </button>

        {/* Quick Stock Info */}
        {stock && stockStatus !== 'in_stock' && (
          <div className="mt-2 text-center">
            <button
              onClick={() => {
                // Navigate to stock management
                window.location.href = '/stock-management';
              }}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Quản lý tồn kho
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCardWithStock;