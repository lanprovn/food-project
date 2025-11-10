import React from 'react';

interface OrderDisplayHeaderProps {
  currentTime: Date;
}

export const OrderDisplayHeader: React.FC<OrderDisplayHeaderProps> = ({ currentTime }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📋 Hiển Thị Đơn Hàng
          </h1>
          <p className="text-gray-600">
            Theo dõi các đơn hàng đang được tạo và xử lý real-time
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">Thời gian hiện tại</div>
          <div className="text-2xl font-bold text-gray-800">
            {currentTime.toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

