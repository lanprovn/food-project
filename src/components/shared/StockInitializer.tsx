import React, { useEffect } from 'react';
import { initializeProductStock } from '../../utils/stockManagement';
import { useProducts } from '../../hooks/useProducts';

// Component to initialize stock for all products
const StockInitializer: React.FC = () => {
  const { products } = useProducts();

  useEffect(() => {
    // Initialize stock for all products if they don't exist
    products.forEach(product => {
      const existingStock = localStorage.getItem(`stock_${product.id}`);
      if (!existingStock) {
        // Initialize with random stock between 10-50
        const initialStock = Math.floor(Math.random() * 40) + 10;
        try {
          initializeProductStock(String(product.id), initialStock);
          console.log(`Initialized stock for ${product.name}: ${initialStock}`);
        } catch (error) {
          console.error(`Failed to initialize stock for ${product.name}:`, error);
        }
      }
    });
  }, [products]);

  return null; // This component doesn't render anything
};

export default StockInitializer;
