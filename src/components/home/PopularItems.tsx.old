import React from 'react';
import type { Product } from '../../types/product';
import ProductGrid from '../product/ProductGrid';
import SectionTitle from '../shared/SectionTitle';

interface PopularItemsProps {
  products: Product[];
  className?: string;
}

const PopularItems: React.FC<PopularItemsProps> = ({
  products,
  className = '',
}) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Món ăn phổ biến"
          centered
          className="mb-12"
        />
        <ProductGrid
          products={products}
          columns={5}
        />
      </div>
    </section>
  );
};

export default PopularItems;
