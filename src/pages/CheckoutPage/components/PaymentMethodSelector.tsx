import React from 'react';
import type { PaymentMethod } from '../types';
import { PAYMENT_METHODS } from '../types';

interface PaymentMethodSelectorProps {
  paymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange
}) => {
  const paymentMethods: Array<{ key: PaymentMethod; icon: string }> = [
    { key: 'cash', icon: '💵' },
    { key: 'card', icon: '💳' },
    { key: 'qr', icon: '📱' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Phương thức thanh toán</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paymentMethods.map((method) => (
          <button
            key={method.key}
            onClick={() => onPaymentMethodChange(method.key)}
            className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              paymentMethod === method.key
                ? 'border-orange-500 bg-orange-50 text-orange-600 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-sm'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-3">{method.icon}</div>
              <div className="font-semibold">{PAYMENT_METHODS[method.key]}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

