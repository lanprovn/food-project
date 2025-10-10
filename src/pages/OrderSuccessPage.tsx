import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate('/pos');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto animate-bounce" />
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Đơn hàng đã được ghi nhận!
          </h1>
          <p className="text-gray-600 text-lg">
            Cảm ơn bạn đã sử dụng dịch vụ của Ocha Việt. 
            Đơn hàng của bạn đang được chuẩn bị.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleNewOrder}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Tạo đơn mới
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Về trang chủ
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Thời gian chuẩn bị: 15-20 phút
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Mã đơn hàng: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
