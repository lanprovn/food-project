import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/auth';
import { AuthContext } from './AuthContext';
import { validateEmail, validatePassword, validateName, sanitizeInput } from '../utils/validation';
import toast from 'react-hot-toast';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('foodwagon_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('foodwagon_user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Validate inputs
      const emailValidation = validateEmail(sanitizeInput(email));
      const passwordValidation = validatePassword(password);
      
      if (!emailValidation.isValid) {
        toast.error(emailValidation.error || 'Email không hợp lệ');
        return false;
      }
      
      if (!passwordValidation.isValid) {
        toast.error(passwordValidation.error || 'Mật khẩu không hợp lệ');
        return false;
      }
      
      // Mock login - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
          phone: '+1234567890',
          address: '123 Main St, City, State'
        };
        
        setUser(mockUser);
        localStorage.setItem('foodwagon_user', JSON.stringify(mockUser));
        toast.success('Đăng nhập thành công!');
        return true;
      } else {
        toast.error('Email hoặc mật khẩu không hợp lệ');
        return false;
      }
    } catch {
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Validate inputs
      const emailValidation = validateEmail(sanitizeInput(email));
      const passwordValidation = validatePassword(password);
      const nameValidation = validateName(sanitizeInput(name));
      
      if (!emailValidation.isValid) {
        toast.error(emailValidation.error || 'Email không hợp lệ');
        return false;
      }
      
      if (!passwordValidation.isValid) {
        toast.error(passwordValidation.error || 'Mật khẩu không hợp lệ');
        return false;
      }
      
      if (!nameValidation.isValid) {
        toast.error(nameValidation.error || 'Tên không hợp lệ');
        return false;
      }
      
      // Mock registration - in real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email && password.length >= 6 && name) {
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          name,
          phone: '+1234567890',
          address: '123 Main St, City, State'
        };
        
        setUser(mockUser);
        localStorage.setItem('foodwagon_user', JSON.stringify(mockUser));
        toast.success('Đăng ký thành công!');
        return true;
      } else {
        toast.error('Vui lòng điền đầy đủ thông tin');
        return false;
      }
    } catch {
      toast.error('Đăng ký thất bại. Vui lòng thử lại.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodwagon_user');
    toast.success('Đăng xuất thành công!');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

