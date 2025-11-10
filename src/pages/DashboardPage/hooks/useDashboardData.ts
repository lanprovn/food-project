// Dashboard data hook
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import type { DailySales } from '../types';
import type { StockAlert } from '../../../utils/stockManagement';

export const useDashboardData = () => {
  const [dailySales, setDailySales] = useState<DailySales | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isConnected, setIsConnected] = useState(true);
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([]);

  // Load daily sales data from localStorage
  const loadData = useCallback(() => {
    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Filter today's orders
      const todayOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        return orderDate === today;
      });

      // Calculate totals
      const totalRevenue = todayOrders.reduce((sum: number, order: any) => {
        return sum + parseFloat(order.totalAmount || 0);
      }, 0);

      // Transform to DailySales format
      const transformedData: DailySales = {
        date: today,
        totalRevenue: totalRevenue,
        totalOrders: todayOrders.length,
        orders: todayOrders.map((order: any) => ({
          id: order.id,
          orderNumber: order.orderNumber,
          timestamp: new Date(order.createdAt).getTime(),
          total: parseFloat(order.totalAmount || 0),
          items: order.items?.length || 0,
          customerName: order.customerName || 'Khách hàng',
          paymentMethod: (order.paymentMethod?.toLowerCase() || 'cash') as 'cash' | 'card' | 'qr',
          products: order.items?.map((item: any) => ({
            name: item.product?.name || 'Sản phẩm',
            quantity: item.quantity,
            price: parseFloat(item.price || 0),
            size: item.selectedSize || null,
            toppings: item.selectedToppings || [],
            note: item.note || null,
          })) || [],
        })),
      };
      
      setDailySales(transformedData);
      setStockAlerts([]);
    } catch (error) {
      console.error('Error loading daily sales:', error);
      setDailySales(null);
      setStockAlerts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check if date changed and auto-reset
  useEffect(() => {
    const checkDateChange = () => {
      const today = new Date().toISOString().split('T')[0];
      const lastDate = localStorage.getItem('dashboard_last_date');
      
      if (lastDate && lastDate !== today) {
        // Date changed, load new day's data
        loadData();
        toast.success('Đã chuyển sang ngày mới!', {
          duration: 2000,
          position: 'top-right',
        });
      }
      
      localStorage.setItem('dashboard_last_date', today);
    };

    // Check on mount
    checkDateChange();
    
    // Check every minute
    const dateCheckInterval = setInterval(checkDateChange, 60000);
    
    return () => clearInterval(dateCheckInterval);
  }, [loadData]);

  useEffect(() => {
    loadData();
    
    // Listen for storage changes (real-time updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && e.key.startsWith('dailySales_')) {
        const today = new Date().toISOString().split('T')[0];
        if (e.key === `dailySales_${today}`) {
          loadData();
        }
      }
    };
    
    // Listen for custom events (for same-tab updates)
    const handleOrderUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      setIsConnected(true);
      loadData();
      
      // Show notification for new order
      if (customEvent.detail) {
        toast.success(`🛒 Đơn hàng mới: ${formatCurrency(customEvent.detail.total)}`, {
          duration: 3000,
          position: 'top-right',
        });
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('orderCompleted', handleOrderUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('orderCompleted', handleOrderUpdate);
    };
  }, [loadData]);

  return {
    dailySales,
    isLoading,
    currentTime,
    isConnected,
    stockAlerts,
    reloadData: loadData
  };
};

// Helper function for currency formatting
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

