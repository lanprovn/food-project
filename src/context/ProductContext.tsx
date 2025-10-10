import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ProductContextType, Product, Restaurant, Category, DiscountItem } from '../types/product';
import productsData from '../assets/products.json';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [discountItems, setDiscountItems] = useState<DiscountItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'popular'>('popular');
  const [isLoading, setIsLoading] = useState(false);

  const loadProducts = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setProducts(productsData.products);
      setRestaurants(productsData.restaurants as Restaurant[]);
      
      // Add icons to categories
      const categoriesWithIcons = productsData.categories.map((category, index) => ({
        ...category,
        icon: [
          'fas fa-coffee',
          'fas fa-birthday-cake', 
          'fas fa-hamburger',
          'fas fa-utensils',
          'fas fa-bread-slice',
          'fas fa-snowflake',
          'fas fa-drumstick-bite',
          'fas fa-pizza-slice',
          'fas fa-fire',
          'fas fa-bowl-food'
        ][index] || 'fas fa-th-large'
      }));
      
      setCategories(categoriesWithIcons);
      setDiscountItems(productsData.discountItems);
      setFilteredProducts(productsData.products);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        product.tags && product.tags.some(tag =>
          selectedTags.some(selectedTag =>
            tag.toLowerCase().includes(selectedTag.toLowerCase())
          )
        )
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.rating - a.rating;
      }
    });

    setFilteredProducts(filtered);
  };

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when search query, category, tags, or sort changes
  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedTags, sortBy, products]);

  const value: ProductContextType = {
    products,
    restaurants,
    categories,
    discountItems,
    filteredProducts,
    searchQuery,
    selectedCategory,
    selectedTags,
    sortBy,
    isLoading,
    setSearchQuery,
    setSelectedCategory,
    setSelectedTags,
    setSortBy,
    filterProducts,
    loadProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
