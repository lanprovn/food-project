import React from 'react';
import { Link } from 'react-router-dom';
import ButtonFilled from '../components/shared/ButtonFilled';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold text-primary mb-4">
            404
          </div>
          <div className="text-6xl text-gray-300 mb-4">
            <i className="fas fa-utensils"></i>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Không tìm thấy trang
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Trang bạn đang tìm kiếm có vẻ như đã đi lạc như một đơn hàng giao hàng bị mất. 
            Đừng lo lắng, chúng tôi sẽ giúp bạn tìm đường về!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link to="/">
            <ButtonFilled variant="primary" size="lg" className="w-full">
              <i className="fas fa-home mr-2"></i>
              Về trang chủ
            </ButtonFilled>
          </Link>
          
          <Link to="/menu">
            <ButtonFilled variant="secondary" size="lg" className="w-full">
              <i className="fas fa-utensils mr-2"></i>
              Duyệt thực đơn
            </ButtonFilled>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">Hoặc thử những trang phổ biến này:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/about" 
              className="text-primary hover:text-red-600 transition-colors"
            >
              Giới thiệu
            </Link>
            <Link 
              to="/contact" 
              className="text-primary hover:text-red-600 transition-colors"
            >
              Liên hệ
            </Link>
            <Link 
              to="/menu" 
              className="text-primary hover:text-red-600 transition-colors"
            >
              Thực đơn
            </Link>
          </div>
        </div>

        {/* Fun Message */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
            Trong khi bạn ở đây, tại sao không đặt một số món ăn ngon? 
            Giao hàng của chúng tôi nhanh hơn việc tìm trang này! 🍕
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
