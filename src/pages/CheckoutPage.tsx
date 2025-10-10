import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    table: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleCompleteOrder = () => {
    // Mock order completion
    const paymentMethods = {
      'cash': 'Tiền mặt',
      'card': 'Thẻ ngân hàng',
      'qr': 'Quét mã QR'
    };
    
    alert(`Thanh toán ${paymentMethods[paymentMethod as keyof typeof paymentMethods]} thành công!`);
    clearCart();
    navigate('/order-success');
  };

  const handleBackToMenu = () => {
    navigate('/pos');
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-orange-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/src/assets/img/gallery/logo.svg" alt="Phở Việt" className="h-16 w-16" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Thanh toán</h1>
              <p className="text-lg text-gray-600">Hoàn tất đơn hàng của bạn</p>
            </div>
          </div>
          <button
            onClick={handleBackToMenu}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Quay lại
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Order Summary */}
        <div className="w-96 bg-white shadow-lg border-r-4 border-orange-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Đơn hàng</h2>
            
            {items.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p className="text-lg text-gray-500">Giỏ hàng trống</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <span className="text-lg font-bold text-orange-600">
                        {formatPrice(item.totalPrice)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Số lượng: {item.quantity}
                    </div>
                    {item.selectedSize && (
                      <div className="text-sm text-gray-600 mb-1">
                        Size: {item.selectedSize.name}
                        {item.selectedSize.extraPrice > 0 && ` (+${formatPrice(item.selectedSize.extraPrice)})`}
                      </div>
                    )}
                    {item.selectedToppings.length > 0 && (
                      <div className="text-sm text-gray-600 mb-1">
                        Topping: {item.selectedToppings.map(t => 
                          `${t.name}${t.extraPrice > 0 ? ` (+${formatPrice(t.extraPrice)})` : ''}`
                        ).join(', ')}
                      </div>
                    )}
                    {item.note && (
                      <div className="text-sm text-gray-600">
                        Ghi chú: {item.note}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="border-t-2 border-gray-200 pt-4 mt-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-semibold text-gray-800">Tạm tính:</span>
                    <span className="text-xl font-bold text-gray-800">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg text-gray-600">Phí dịch vụ:</span>
                    <span className="text-lg text-gray-600">0₫</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-gray-600">VAT:</span>
                    <span className="text-lg text-gray-600">0₫</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">Tổng cộng:</span>
                    <span className="text-3xl font-bold text-orange-600">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Info & Payment */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Thông tin khách hàng</h2>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-orange-500 focus:outline-none"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-orange-500 focus:outline-none"
                    placeholder="Nhập số điện thoại"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Số bàn
                  </label>
                  <input
                    type="text"
                    name="table"
                    value={customerInfo.table}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-orange-500 focus:outline-none"
                    placeholder="Nhập số bàn"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-3">
                    Ghi chú đặc biệt
                  </label>
                  <textarea
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-orange-500 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Ghi chú đặc biệt cho đơn hàng"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Phương thức thanh toán</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handlePaymentMethodChange('cash')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    paymentMethod === 'cash'
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <i className="fas fa-money-bill-wave text-3xl mb-3"></i>
                    <div className="text-lg font-semibold">Tiền mặt</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handlePaymentMethodChange('card')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <i className="fas fa-credit-card text-3xl mb-3"></i>
                    <div className="text-lg font-semibold">Thẻ</div>
                  </div>
                </button>
                
                <button
                  onClick={() => handlePaymentMethodChange('qr')}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    paymentMethod === 'qr'
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <i className="fas fa-qrcode text-3xl mb-3"></i>
                    <div className="text-lg font-semibold">QR Code</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Complete Order Button */}
            <div className="text-center">
              <button
                onClick={handleCompleteOrder}
                disabled={!customerInfo.name || !customerInfo.phone || items.length === 0}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-6 rounded-2xl text-2xl font-bold hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-3"
              >
                <i className="fas fa-check"></i>
                <span>Hoàn tất đơn hàng</span>
                <span className="text-lg opacity-80">({formatPrice(totalPrice)})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;