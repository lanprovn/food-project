// Order success hook
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import { useOrderTracking } from '../../../hooks/useOrderTracking';
import { loadLatestOrder } from '../utils/orderSuccessUtils';
import type { OrderDetails, LocationState, PaymentMethod } from '../types';
import type { OrderTracking } from '../../../types/display';

export const useOrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateOrderStatus } = useCart();
  const { updateOrderStatus: updateOrderTrackingStatus } = useOrderTracking();
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get order details from localStorage
  useEffect(() => {
    const loadData = () => {
      try {
        const result = loadLatestOrder();
        if (result) {
          setOrderDetails(result.order);
        }

        // Get payment method from location state if available
        const state = location.state as LocationState | null;
        if (state?.paymentMethod) {
          setPaymentMethod(state.paymentMethod);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading order details:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, [location.state]);

  // Update order tracking status to completed when page loads
  useEffect(() => {
    updateOrderStatus('completed');

    const state = location.state as LocationState | null;
    if (state?.orderId) {
      const trackingStored = localStorage.getItem('ocha_order_tracking_data');
      if (trackingStored) {
        const trackingOrders = JSON.parse(trackingStored) as OrderTracking[];
        const order = trackingOrders.find((o: OrderTracking) => o.orderId === state.orderId);
        if (order) {
          updateOrderTrackingStatus(
            order.id,
            'completed',
            state.orderId,
            state.paymentMethod,
            'success'
          );
        }
      }
    }
  }, [updateOrderStatus, updateOrderTrackingStatus, location.state]);

  const handleNewOrder = () => {
    navigate('/');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return {
    orderDetails,
    paymentMethod,
    isLoading,
    handleNewOrder,
    handleGoHome
  };
};

