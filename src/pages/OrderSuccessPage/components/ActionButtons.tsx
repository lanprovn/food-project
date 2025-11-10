import React from 'react';

interface ActionButtonsProps {
  onNewOrder: () => void;
  onGoHome: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onNewOrder,
  onGoHome
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onNewOrder}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Tạo đơn mới</span>
        </button>
        <button
          onClick={onGoHome}
          className="bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-all duration-200 border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Về trang chủ</span>
        </button>
      </div>
    </>
  );
};

