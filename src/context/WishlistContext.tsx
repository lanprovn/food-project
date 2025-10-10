import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import toast from 'react-hot-toast';

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('foodwagon_wishlist');
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('foodwagon_wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.error(`${product.name} đã có trong danh sách yêu thích!`);
        return prevItems;
      } else {
        const newItems = [...prevItems, product];
        toast.success(`Đã thêm ${product.name} vào danh sách yêu thích!`);
        return newItems;
      }
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      const newItems = prevItems.filter(item => item.id !== productId);
      if (item) {
        toast.success(`Đã xóa ${item.name} khỏi danh sách yêu thích!`);
      }
      return newItems;
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success('Đã xóa tất cả danh sách yêu thích!');
  };

  const value: WishlistContextType = {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
