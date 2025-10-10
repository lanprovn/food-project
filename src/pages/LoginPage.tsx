import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <img 
            src="/src/assets/img/gallery/logo.svg" 
            alt="Phở Việt Logo" 
            className="mx-auto h-12 w-12"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? 'Đăng nhập vào tài khoản' : 'Tạo tài khoản mới'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-primary hover:underline font-medium"
            >
              {isLogin ? 'Đăng ký tại đây' : 'Đăng nhập tại đây'}
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <LoginForm onSuccess={handleSuccess} onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
