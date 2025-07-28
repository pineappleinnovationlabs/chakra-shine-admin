import { useState, useCallback } from 'react';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: 'superadmin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AdminUser;
  token?: string;
  message?: string;
}

interface UseAdminAuthReturn {
  isLoading: boolean;
  error: string | null;
  user: AdminUser | null;
  loginWithDemo: () => Promise<AuthResponse>;
  loginWithCredentials: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => void;
}

// Demo credentials for immediate access
const DEMO_CREDENTIALS = {
  email: 'admin@klearkarma.com',
  password: 'KlearKarma2024!'
};

// Mock admin user data
const DEMO_ADMIN_USER: AdminUser = {
  id: 'admin_001',
  email: 'admin@klearkarma.com',
  fullName: 'Demo Administrator',
  role: 'superadmin',
  permissions: ['*'],
  lastLogin: new Date().toISOString()
};

export const useAdminAuth = (): UseAdminAuthReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);

  const simulateApiCall = (delay: number = 1500): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  const loginWithDemo = useCallback(async (): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await simulateApiCall(1200);

      // Generate demo JWT token
      const demoToken = `demo_jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Store in localStorage
      localStorage.setItem('kk_admin_token', demoToken);
      localStorage.setItem('kk_admin_user', JSON.stringify(DEMO_ADMIN_USER));

      setUser(DEMO_ADMIN_USER);

      return {
        success: true,
        user: DEMO_ADMIN_USER,
        token: demoToken,
        message: 'Demo admin access granted successfully!'
      };
    } catch (err) {
      const errorMessage = 'Demo login failed. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithCredentials = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await simulateApiCall(2000);

      // Check demo credentials
      if (credentials.email === DEMO_CREDENTIALS.email && 
          credentials.password === DEMO_CREDENTIALS.password) {
        
        const demoToken = `auth_jwt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        localStorage.setItem('kk_admin_token', demoToken);
        localStorage.setItem('kk_admin_user', JSON.stringify(DEMO_ADMIN_USER));

        setUser(DEMO_ADMIN_USER);

        return {
          success: true,
          user: DEMO_ADMIN_USER,
          token: demoToken,
          message: 'Authentication successful!'
        };
      }

      // Simulate invalid credentials
      throw new Error('Invalid email or password');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('kk_admin_token');
    localStorage.removeItem('kk_admin_user');
    setUser(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    user,
    loginWithDemo,
    loginWithCredentials,
    logout
  };
};