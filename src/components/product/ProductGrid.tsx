import React from 'react';
import type { Product } from '../../types/product';
import ProductCard from './ProductCard';
import { formatPrice } from '../../utils/formatPrice';

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4 | 5;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  className = '',
  columns = 4,
}) => {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-6">
          <i className="fas fa-search text-6xl"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-gray-500 mb-6">
          Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc
        </p>
        <div className="bg-gray-100 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-gray-600">
            💡 <strong>Gợi ý:</strong> Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
          </p>
        </div>
      </div>
    );
  }

  // Calculate total value for display
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const averagePrice = products.length > 0 ? totalValue / products.length : 0;

  return (
    <div className="space-y-6">
      {/* Grid Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span>
            Hiển thị {products.length} sản phẩm
          </span>
          {products.length > 0 && (
            <span>
              Giá trung bình: {formatPrice(averagePrice)}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500">
          Tổng giá trị: {formatPrice(totalValue)}
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid ${gridClasses[columns]} gap-6 ${className}`}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
