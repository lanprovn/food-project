import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../types/product';
import type { WishlistContextType, WishlistItem } from '../types/wishlist';
import { WishlistContext } from './WishlistContext';
import toast from 'react-hot-toast';

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

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

  const addToWishlist = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast.error(`${product.name} đã có trong danh sách yêu thích!`);
        return prevItems;
      } else {
        const wishlistItem: WishlistItem = {
          id: Date.now(),
          product,
          addedAt: new Date().toISOString()
        };
        const newItems = [...prevItems, wishlistItem];
        toast.success(`Đã thêm ${product.name} vào danh sách yêu thích!`);
        return newItems;
      }
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.product.id === productId);
      const newItems = prevItems.filter(item => item.product.id !== productId);
      if (item) {
        toast.success(`Đã xóa ${item.product.name} khỏi danh sách yêu thích!`);
      }
      return newItems;
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return items.some(item => item.product.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success('Đã xóa tất cả danh sách yêu thích!');
  };

  const value: WishlistContextType = {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

