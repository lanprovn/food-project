import React from 'react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/formatPrice';
import ButtonFilled from '../shared/ButtonFilled';

interface CartSummaryProps {
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ onCheckout }) => {
  const { items, totalPrice, totalItems } = useCart();

  const deliveryFee = totalPrice > 0 ? 2.99 : 0;
  const tax = totalPrice * 0.1; // 10% tax
  const finalTotal = totalPrice + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="text-gray-400 mb-4">
          <i className="fas fa-shopping-cart text-4xl"></i>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Giỏ hàng trống</h3>
        <p className="text-gray-500">Thêm món ăn ngon để bắt đầu!</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Tạm tính ({totalItems} món)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Phí giao hàng</span>
          <span>{formatPrice(deliveryFee)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>Thuế</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between font-medium text-lg">
            <span>Tổng cộng</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>
        
        <ButtonFilled
          onClick={onCheckout}
          variant="primary"
          size="lg"
          className="w-full mt-6"
        >
          Thanh toán
        </ButtonFilled>
      </div>
    </div>
  );
};

export default CartSummary;
