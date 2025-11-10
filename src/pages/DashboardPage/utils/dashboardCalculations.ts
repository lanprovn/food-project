// Dashboard calculation utilities
import type { DailySales, TopProduct, PaymentStats, HourlyRevenue } from './types';

export const getTopSellingProducts = (dailySales: DailySales | null, limit: number = 5): TopProduct[] => {
  if (!dailySales || dailySales.orders.length === 0) return [];
  
  // Count products from all orders
  const productCount: { [key: string]: { name: string; quantity: number; revenue: number } } = {};
  
  dailySales.orders.forEach(order => {
    if (order.products) {
      order.products.forEach(product => {
        if (productCount[product.name]) {
          productCount[product.name].quantity += product.quantity;
          productCount[product.name].revenue += product.price; // product.price là totalPrice của item đó
        } else {
          productCount[product.name] = {
            name: product.name,
            quantity: product.quantity,
            revenue: product.price
          };
        }
      });
    }
  });
  
  // Sort by quantity descending and return top N
  return Object.values(productCount)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, limit);
};

export const getTopSellingProduct = (dailySales: DailySales | null): TopProduct | null => {
  const topProducts = getTopSellingProducts(dailySales, 1);
  return topProducts.length > 0 ? topProducts[0] : null;
};

export const getHourlyRevenue = (dailySales: DailySales | null): HourlyRevenue[] => {
  if (!dailySales || dailySales.orders.length === 0) return [];
  
  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour.toString().padStart(2, '0')}:00`,
    revenue: 0
  }));

  dailySales.orders.forEach(order => {
    const hour = new Date(order.timestamp).getHours();
    hourlyData[hour].revenue += order.total;
  });

  return hourlyData;
};

export const getPaymentMethodStats = (dailySales: DailySales | null): PaymentStats => {
  if (!dailySales || dailySales.orders.length === 0) return {};
  
  const stats: { [key: string]: { count: number; revenue: number } } = {};
  
  dailySales.orders.forEach(order => {
    const method = order.paymentMethod;
    if (method) {
      if (!stats[method]) {
        stats[method] = { count: 0, revenue: 0 };
      }
      stats[method].count += 1;
      stats[method].revenue += order.total;
    }
  });
  
  return stats;
};

export const getYesterdayData = (): DailySales | null => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    const storedData = localStorage.getItem(`dailySales_${yesterdayStr}`);
    
    if (storedData) {
      return JSON.parse(storedData);
    }
  } catch (error) {
    console.error('Error loading yesterday data:', error);
  }
  return null;
};

export const loadDailySales = (): DailySales => {
  const today = new Date().toISOString().split('T')[0];
  const storedData = localStorage.getItem(`dailySales_${today}`);
  
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    // Initialize empty data for today
    const emptyData: DailySales = {
      date: today,
      totalRevenue: 0,
      totalOrders: 0,
      orders: []
    };
    localStorage.setItem(`dailySales_${today}`, JSON.stringify(emptyData));
    return emptyData;
  }
};

export const resetDailyData = (): DailySales => {
  const today = new Date().toISOString().split('T')[0];
  const emptyData: DailySales = {
    date: today,
    totalRevenue: 0,
    totalOrders: 0,
    orders: []
  };
  localStorage.setItem(`dailySales_${today}`, JSON.stringify(emptyData));
  return emptyData;
};

