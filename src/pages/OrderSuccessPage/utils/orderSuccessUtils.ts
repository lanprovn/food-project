// Order success utilities
import type { PaymentMethod } from './types';
import type { OrderDetails } from './types';

export const formatOrderTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getPaymentMethodText = (method: PaymentMethod): string => {
  switch (method) {
    case 'cash':
      return 'Tiền mặt';
    case 'card':
      return 'Thẻ ngân hàng';
    case 'qr':
      return 'Quét mã QR';
    default:
      return 'Chưa xác định';
  }
};

export const loadLatestOrder = (): { order: OrderDetails; paymentMethod: PaymentMethod } | null => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const storedData = localStorage.getItem(`dailySales_${today}`);

    if (storedData) {
      const dailySales = JSON.parse(storedData);
      const orders = dailySales.orders || [];

      if (orders.length > 0) {
        const latestOrder = orders[orders.length - 1];
        return { order: latestOrder, paymentMethod: null };
      }
    }
  } catch (error) {
    console.error('Error loading order details:', error);
  }
  return null;
};

