import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewOrder = () => {
    navigate('/pos');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-green-50 text-gray-800 text-center px-4">
      <div className="bg-green-500 rounded-full p-4 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold mb-2">Đơn hàng đã được ghi nhận!</h1>
      <p className="mb-6">Cảm ơn bạn đã sử dụng dịch vụ của Ocha Việt.<br/>Đơn hàng của bạn đang được chuẩn bị.</p>
      <div className="flex gap-3">
        <button 
          onClick={handleNewOrder}
          className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition"
        >
          Tạo đơn mới
        </button>
        <button 
          onClick={handleGoHome}
          className="border border-gray-300 text-gray-700 px-5 py-2 rounded hover:bg-gray-100 transition"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
