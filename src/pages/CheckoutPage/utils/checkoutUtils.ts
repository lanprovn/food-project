// Checkout utilities
import type { CustomerInfo, PaymentMethod } from './types';
import type { CartItem } from '../../../types/cart';
import type { Topping } from '../../../types/product';

export const validatePhone = (phone: string): boolean => {
  // Vietnamese phone number format: 10-11 digits, may start with 0 or +84
  const phoneRegex = /^(0|\+84)[1-9]\d{8,9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const saveOrderToDailySales = (
  orderId: string,
  totalPrice: number,
  items: CartItem[],
  customerInfo: CustomerInfo,
  paymentMethod: PaymentMethod
): void => {
  const today = new Date().toISOString().split('T')[0];
  const storedData = localStorage.getItem(`dailySales_${today}`);
  
  let dailySales;
  if (storedData) {
    dailySales = JSON.parse(storedData);
  } else {
    dailySales = {
      date: today,
      totalRevenue: 0,
      totalOrders: 0,
      orders: []
    };
  }
  
  // Add new order with detailed product information
  const orderDetails = {
    id: orderId,
    timestamp: Date.now(),
    total: totalPrice,
    items: items.length,
    customerName: customerInfo.name || 'Khách hàng',
    paymentMethod: paymentMethod,
    products: items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.totalPrice,
      size: item.selectedSize?.name || null,
      toppings: item.selectedToppings.map((t: Topping) => t.name),
      note: item.note || null
    }))
  };
  
  dailySales.orders.push(orderDetails);
  dailySales.totalOrders += 1;
  dailySales.totalRevenue += totalPrice;
  
  // Save back to localStorage
  localStorage.setItem(`dailySales_${today}`, JSON.stringify(dailySales));
};

