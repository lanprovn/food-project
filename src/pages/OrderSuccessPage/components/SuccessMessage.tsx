import React from 'react';

export const SuccessMessage: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Đơn hàng đã được ghi nhận!
      </h1>
      <p className="text-lg text-gray-600 mb-2">
        Cảm ơn bạn đã sử dụng dịch vụ của Ocha Việt.
      </p>
      <p className="text-gray-500">
        Đơn hàng của bạn đang được chuẩn bị.
      </p>
    </div>
  );
};

