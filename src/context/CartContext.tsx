import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartContextType, CartItem } from '../types/cart';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('foodwagon_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('foodwagon_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setItems(prevItems => {
      const existing = prevItems.find(
        (i) =>
          i.productId === item.productId &&
          i.selectedSize?.name === item.selectedSize?.name &&
          JSON.stringify(i.selectedToppings) === JSON.stringify(item.selectedToppings)
      );
      
      if (existing) {
        const updatedItems = prevItems.map((i) =>
          i === existing
            ? { 
                ...i, 
                quantity: i.quantity + item.quantity, 
                totalPrice: i.totalPrice + item.totalPrice 
              }
            : i
        );
        toast.success(`Đã cập nhật số lượng ${item.name}!`);
        return updatedItems;
      } else {
        const newItem = { ...item, id: uuidv4() };
        toast.success(`Đã thêm ${item.name} vào giỏ hàng!`);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      const newItems = prevItems.filter(item => item.id !== id);
      if (item) {
        toast.success(`Đã xóa ${item.name} khỏi giỏ hàng!`);
      }
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const basePrice = item.basePrice + (item.selectedSize?.extraPrice || 0) + 
            item.selectedToppings.reduce((sum, t) => sum + t.extraPrice, 0);
          return { ...item, quantity, totalPrice: basePrice * quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Đã xóa tất cả giỏ hàng!');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
