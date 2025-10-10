import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/auth';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    } catch (error) {
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
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
    } catch (error) {
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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
