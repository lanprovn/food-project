import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { formatPrice } from '../utils/formatPrice';
import ButtonFilled from '../components/shared/ButtonFilled';
import InputField from '../components/shared/InputField';
import CartItem from '../components/cart/CartItem';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: 'Dhaka',
    zipCode: '1216',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const deliveryFee = totalPrice > 0 ? 2.99 : 0;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + deliveryFee + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Order placed successfully! Thank you for your order.');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <i className="fas fa-shopping-cart text-6xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Thêm món ăn ngon để bắt đầu!</p>
          <ButtonFilled onClick={() => navigate('/menu')} variant="primary" size="lg">
            Duyệt thực đơn
          </ButtonFilled>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
          <p className="text-gray-600">Hoàn tất đơn hàng của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tạm tính ({items.length} món)</span>
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
                <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Thông tin giao hàng</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                type="text"
                name="firstName"
                placeholder="Tên"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Họ"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <InputField
                type="email"
                name="email"
                placeholder="Địa chỉ email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <InputField
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <InputField
                type="text"
                name="address"
                placeholder="Địa chỉ giao hàng"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                type="text"
                name="city"
                placeholder="Thành phố"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <InputField
                type="text"
                name="zipCode"
                placeholder="Mã bưu điện"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="card">Thẻ tín dụng/Ghi nợ</option>
                <option value="cash">Thanh toán khi nhận hàng</option>
              </select>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="space-y-4 mb-6">
                <InputField
                  type="text"
                  name="cardNumber"
                  placeholder="Số thẻ"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                  <InputField
                    type="text"
                    name="cvv"
                    placeholder="Mã CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <ButtonFilled
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              <i className="fas fa-check mr-2"></i>
              Đặt hàng - {formatPrice(finalTotal)}
            </ButtonFilled>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
