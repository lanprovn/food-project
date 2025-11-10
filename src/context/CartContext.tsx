import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartContextType, CartItem } from '../types/cart';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useDisplaySync } from '../hooks/useDisplaySync';
import { useOrderTracking } from '../hooks/useOrderTracking';

// Context definition
export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderCreator, setOrderCreator] = useState<{ type: 'staff' | 'customer'; name?: string } | null>(null);
  
  // Real-time display sync
  const { sendToDisplay } = useDisplaySync();
  const { sendOrderUpdate } = useOrderTracking();

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

  // Real-time sync to Customer Display whenever cart changes
  useEffect(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Always sync to display, even when cart is empty
    sendToDisplay(items, totalPrice, totalItems, 'creating');
    
    // Send order tracking update if order creator is set
    if (orderCreator && items.length > 0) {
      sendOrderUpdate(
        items,
        totalPrice,
        totalItems,
        orderCreator.type,
        orderCreator.name,
        undefined // customerInfo sẽ được set khi checkout
      );
    }
  }, [items, sendToDisplay, sendOrderUpdate, orderCreator]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    // Create unique toast ID based on product details to prevent duplicates
    const toastId = `add-${item.productId}-${item.selectedSize?.name || 'default'}-${JSON.stringify(item.selectedToppings)}`;
    
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
        // Use toast id to prevent duplicate notifications
        setTimeout(() => {
          toast.success(`Đã cập nhật số lượng ${item.name}!`, {
            id: `update-${item.productId}-${item.selectedSize?.name || 'default'}`
          });
        }, 0);
        return updatedItems;
      } else {
        const newItem = { ...item, id: uuidv4() };
        // Use toast id to prevent duplicate notifications - same ID will replace previous toast
        setTimeout(() => {
          toast.success(`Đã thêm ${item.name} vào giỏ hàng!`, {
            id: toastId // Same ID prevents duplicate
          });
        }, 0);
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      const newItems = prevItems.filter(item => item.id !== id);
      if (item) {
        // Use toast id to prevent duplicate notifications
        setTimeout(() => {
          toast.success(`Đã xóa ${item.name} khỏi giỏ hàng!`, {
            id: `remove-${id}` // Unique ID for this toast
          });
        }, 0);
      }
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove item silently when quantity reaches 0 (no toast)
      // Toast will only show when user explicitly clicks remove button
      setItems(prevItems => prevItems.filter(item => item.id !== id));
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
    // Move toast outside of setState callback
    setTimeout(() => toast.success('Đã xóa tất cả giỏ hàng!'), 0);
  };

  // Function to update order status and sync to display
  const updateOrderStatus = (status: 'creating' | 'confirmed' | 'paid' | 'completed', customerInfo?: { name?: string; table?: string }, paymentMethod?: 'cash' | 'card' | 'qr', paymentStatus?: 'success' | 'pending' | 'failed') => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    sendToDisplay(items, totalPrice, totalItems, status, customerInfo, paymentMethod, paymentStatus);
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
    updateOrderStatus,
    setOrderCreator,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

