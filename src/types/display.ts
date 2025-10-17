import type { CartItem } from './cart';

export interface DisplayData {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  status: 'creating' | 'confirmed' | 'paid' | 'completed';
  customerInfo?: {
    name?: string;
    table?: string;
  };
  timestamp: number;
  paymentMethod?: 'cash' | 'card' | 'qr';
  paymentStatus?: 'success' | 'pending' | 'failed';
}

export interface DisplaySyncMessage {
  type: 'cart_update' | 'order_confirmed' | 'order_completed';
  data: DisplayData;
}

export interface UseDisplaySyncReturn {
  sendToDisplay: (cartItems: CartItem[], totalPrice: number, totalItems: number, status?: DisplayData['status'], customerInfo?: DisplayData['customerInfo'], paymentMethod?: DisplayData['paymentMethod'], paymentStatus?: DisplayData['paymentStatus']) => void;
  subscribeToDisplay: (callback: (data: DisplayData) => void) => () => void;
}
