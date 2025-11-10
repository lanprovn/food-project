// Types for DashboardPage
export interface OrderSummary {
  id: string;
  timestamp: number;
  total: number;
  items: number;
  customerName?: string;
  paymentMethod?: 'cash' | 'card' | 'qr';
  products?: {
    name: string;
    quantity: number;
    price: number;
    size?: string | null;
    toppings: string[];
    note?: string | null;
  }[];
}

export interface DailySales {
  date: string;
  totalRevenue: number;
  totalOrders: number;
  orders: OrderSummary[];
}

export interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
}

export interface PaymentStats {
  [key: string]: {
    count: number;
    revenue: number;
  };
}

export interface HourlyRevenue {
  hour: string;
  revenue: number;
}

