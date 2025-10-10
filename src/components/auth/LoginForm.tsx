import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ButtonFilled from '../shared/ButtonFilled';
import InputField from '../shared/InputField';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <InputField
          type="email"
          placeholder="Địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<i className="fas fa-envelope text-primary"></i>}
          required
        />
      </div>
      
      <div>
        <InputField
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<i className="fas fa-lock text-primary"></i>}
          required
        />
      </div>
      
      <ButtonFilled
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <i className="fas fa-spinner fa-spin mr-2"></i>
            Đang đăng nhập...
          </>
        ) : (
          <>
            <i className="fas fa-sign-in-alt mr-2"></i>
            Đăng nhập
          </>
        )}
      </ButtonFilled>
      
      {onSwitchToRegister && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:underline font-medium"
            >
              Đăng ký tại đây
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
