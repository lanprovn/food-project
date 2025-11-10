// Types for OrderDisplayPage
import type { OrderTracking } from '../../types/display';

export interface GroupedOrders {
  creating: OrderTracking[];
  paid: OrderTracking[];
  preparing: OrderTracking[];
  completed: OrderTracking[];
}

export interface StatusConfig {
  label: string;
  bgColor: string;
  badgeColor: string;
  icon: string;
}

export interface StatusSection {
  key: keyof GroupedOrders;
  title: string;
  orders: OrderTracking[];
}

