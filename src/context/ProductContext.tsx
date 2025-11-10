import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ProductContextType, Product, Restaurant, Category, DiscountItem } from '../types/product';
import productsData from '../assets/products.json';

// Context definition
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

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
      // Load from mock data
      const mockProducts: Product[] = productsData.products.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        category: p.category,
        restaurant: p.restaurant,
        rating: p.rating || 0,
        description: p.description || '',
        discount: p.discount || 0,
        isAvailable: p.stock > 0,
        stock: p.stock || 0,
        isPopular: p.isPopular || false,
        tags: p.tags || [],
        sizes: p.sizes || [],
        toppings: p.toppings || [],
      }));

      const mockCategories: Category[] = productsData.categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        image: c.image,
        description: c.description || '',
        productCount: c.productCount || 0,
        icon: 'fas fa-th-large',
      }));

      const mockRestaurants: Restaurant[] = productsData.restaurants.map((r: any) => ({
        id: r.id,
        name: r.name,
        image: r.image,
        rating: r.rating || 0,
        deliveryTime: r.deliveryTime || '',
        deliveryFee: r.deliveryFee || 0,
        categories: r.categories || [],
      }));

      const mockDiscounts: DiscountItem[] = productsData.discountItems.map((d: any) => ({
        id: d.id,
        name: d.name,
        image: d.image,
        discount: d.discount || 0,
        daysRemaining: d.daysRemaining || 0,
      }));

      setProducts(mockProducts);
      setRestaurants(mockRestaurants);
      setCategories(mockCategories);
      setDiscountItems(mockDiscounts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts([]);
      setRestaurants([]);
      setCategories([]);
      setDiscountItems([]);
      setFilteredProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = useCallback(() => {
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
  }, [products, searchQuery, selectedCategory, selectedTags, sortBy]);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products when search query, category, tags, or sort changes
  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, selectedTags, sortBy, products, filterProducts]);

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

