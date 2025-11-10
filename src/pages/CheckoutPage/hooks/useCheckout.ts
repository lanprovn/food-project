// Checkout hook
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../../../hooks/useCart';
import { validatePhone } from '../utils/checkoutUtils';
import { v4 as uuidv4 } from 'uuid';
import { PAYMENT_METHODS } from '../types';
import type { CustomerInfo, PaymentMethod } from '../types';

export const useCheckout = () => {
  const { items, totalPrice, clearCart, updateOrderStatus } = useCart();
  const navigate = useNavigate();
  
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    table: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: PaymentMethod): void => {
    setPaymentMethod(method);
  };

  const handleCompleteOrder = async (): Promise<void> => {
    // Validate phone number
    if (!validatePhone(customerInfo.phone)) {
      toast.error('Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại 10-11 chữ số.');
      return;
    }

    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Create order locally (mock data)
      const orderId = uuidv4();
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      
      const orderData = {
        id: orderId,
        orderNumber,
        status: 'PAID',
        totalAmount: totalPrice.toString(),
        customerName: customerInfo.name || null,
        customerPhone: customerInfo.phone || null,
        customerTable: customerInfo.table || null,
        notes: customerInfo.notes || null,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: 'SUCCESS',
        orderCreator: 'STAFF',
        orderCreatorName: 'Nhân viên',
        paidAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: items.map(item => ({
          id: uuidv4(),
          productId: item.productId.toString(),
          quantity: item.quantity,
          price: item.basePrice.toString(),
          subtotal: item.totalPrice.toString(),
          selectedSize: item.selectedSize?.name || null,
          selectedToppings: item.selectedToppings?.map(t => t.name) || [],
          note: item.note || null,
          product: {
            id: item.productId.toString(),
            name: item.name,
            image: item.image,
          },
        })),
      };

      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(orders));
      
      toast.success(`Đơn hàng ${orderNumber} đã được tạo thành công!`, {
        duration: 3000,
        icon: '✅'
      });
      
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('orderCompleted', {
        detail: { orderId, orderNumber, total: totalPrice, items: items.length }
      }));
      
      // Update order status to paid and sync to display
      updateOrderStatus('paid', {
        name: customerInfo.name || 'Khách hàng',
        table: customerInfo.table || undefined
      }, paymentMethod, 'success');
      
      // Small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      clearCart();
      navigate('/order-success', {
        state: {
          orderId,
          orderNumber,
          paymentMethod,
          customerName: customerInfo.name,
          table: customerInfo.table
        }
      });
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Không thể tạo đơn hàng. Vui lòng kiểm tra kết nối mạng và thử lại.');
      setIsProcessing(false);
    }
  };

  return {
    items,
    totalPrice,
    customerInfo,
    paymentMethod,
    isProcessing,
    handleInputChange,
    handlePaymentMethodChange,
    handleCompleteOrder
  };
};

