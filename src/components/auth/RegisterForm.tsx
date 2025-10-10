import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import ButtonFilled from '../shared/ButtonFilled';
import InputField from '../shared/InputField';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }
    
    const success = await register(email, password, name);
    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <InputField
          type="text"
          placeholder="Họ và tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={<i className="fas fa-user text-primary"></i>}
          required
        />
      </div>
      
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
      
      <div>
        <InputField
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
            Đang tạo tài khoản...
          </>
        ) : (
          <>
            <i className="fas fa-user-plus mr-2"></i>
            Tạo tài khoản
          </>
        )}
      </ButtonFilled>
      
      {onSwitchToLogin && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:underline font-medium"
            >
              Đăng nhập tại đây
            </button>
          </p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
