// Order display hook
import { useState, useEffect, useMemo } from 'react';
import { groupOrdersByStatus } from '../utils/orderDisplayUtils';
import type { OrderTracking, GroupedOrders } from '../types';

export const useOrderDisplay = () => {
  const [orders, setOrders] = useState<OrderTracking[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load orders from localStorage
  useEffect(() => {
    const loadOrders = () => {
      setIsLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Filter today's orders
        const todayOrders = allOrders.filter((order: any) => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
          return orderDate === today;
        });
        
        // Transform orders to OrderTracking format
        const transformedOrders: OrderTracking[] = todayOrders.map((order: any) => ({
          id: order.id,
          createdBy: (order.orderCreator?.toLowerCase() as 'staff' | 'customer') || 'staff',
          createdByName: order.orderCreatorName || undefined,
          items: order.items?.map((item: any) => ({
            id: item.productId,
            name: item.product?.name || 'Sản phẩm',
            quantity: item.quantity,
            price: parseFloat(item.price || 0),
            totalPrice: parseFloat(item.subtotal || 0),
            selectedSize: item.selectedSize ? { id: '', name: item.selectedSize, extraPrice: 0 } : undefined,
            selectedToppings: item.selectedToppings?.map((name: string, idx: number) => ({
              id: `topping-${idx}`,
              name,
              extraPrice: 0,
            })) || [],
            note: item.note || undefined,
          })) || [],
          totalPrice: parseFloat(order.totalAmount || 0),
          totalItems: order.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
          status: order.status?.toLowerCase() as any || 'paid',
          customerInfo: {
            name: order.customerName || undefined,
            table: order.customerTable || undefined,
            phone: order.customerPhone || undefined,
          },
          timestamp: new Date(order.createdAt).getTime(),
          lastUpdated: new Date(order.updatedAt || order.createdAt).getTime(),
        }));
        
        setOrders(transformedOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
    
    // Listen for new orders
    const handleOrderUpdate = () => {
      loadOrders();
    };
    
    window.addEventListener('orderCompleted', handleOrderUpdate);
    window.addEventListener('storage', handleOrderUpdate);
    
    // Auto-refresh every 5 seconds
    const refreshInterval = setInterval(loadOrders, 5000);
    
    return () => {
      clearInterval(refreshInterval);
      window.removeEventListener('orderCompleted', handleOrderUpdate);
      window.removeEventListener('storage', handleOrderUpdate);
    };
  }, []);

  // Group orders by status
  const groupedOrders = useMemo<GroupedOrders>(() => {
    return groupOrdersByStatus(orders);
  }, [orders]);

  return {
    orders,
    groupedOrders,
    currentTime,
    isLoading,
  };
};

