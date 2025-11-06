import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = memo(({ products }) => {
  const navigate = useNavigate();

  const handleProductClick = useCallback((product: Product) => {
    navigate(`/product/${product.id}`);
  }, [navigate]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-6">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-3">
          Không có sản phẩm nào
        </h3>
        <p className="text-base text-gray-500">
          Vui lòng chọn danh mục khác để xem thêm sản phẩm
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => handleProductClick(product)}
        />
      ))}
    </div>
  );
});

ProductGrid.displayName = 'ProductGrid';

export default ProductGrid;
