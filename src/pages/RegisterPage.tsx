import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
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
            alt="Ocha Việt Logo" 
            className="mx-auto h-12 w-12"
          />
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Tạo tài khoản của bạn
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Tham gia Ocha Việt và bắt đầu đặt những món ăn ngon!
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
