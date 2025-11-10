import React from 'react';
import { useCheckout } from './hooks/useCheckout';
import { OrderSummary } from './components/OrderSummary';
import { CustomerInfoForm } from './components/CustomerInfoForm';
import { PaymentMethodSelector } from './components/PaymentMethodSelector';
import { CompleteOrderButton } from './components/CompleteOrderButton';

const CheckoutPage: React.FC = () => {
  const {
    items,
    totalPrice,
    customerInfo,
    paymentMethod,
    isProcessing,
    handleInputChange,
    handlePaymentMethodChange,
    handleCompleteOrder
  } = useCheckout();

  const isFormValid = Boolean(customerInfo.name && customerInfo.phone);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <OrderSummary items={items} totalPrice={totalPrice} />
        
        <div className="space-y-6">
          <CustomerInfoForm 
            customerInfo={customerInfo}
            onInputChange={handleInputChange}
          />
          
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
          />
          
          <CompleteOrderButton
            totalPrice={totalPrice}
            itemsCount={items.length}
            isProcessing={isProcessing}
            isFormValid={isFormValid}
            onComplete={handleCompleteOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

