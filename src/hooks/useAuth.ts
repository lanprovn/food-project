import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.ts';
import type { AuthContextType } from '../types/auth';

/**
 * Custom hook to access authentication context
 * 
 * Provides access to authentication state and methods including:
 * - User information
 * - Login/logout functionality
 * - Authentication status
 * - Loading states
 * 
 * @returns AuthContextType - Authentication context value
 * @throws Error if used outside of AuthProvider
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * if (isAuthenticated) {
 *   return <div>Welcome, {user?.name}!</div>;
 * }
 * 
 * return <LoginForm onLogin={login} />;
 * ```
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};