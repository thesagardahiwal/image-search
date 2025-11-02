import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode
} from 'react';
import { authService } from '../services/auth';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // On mount, check if user is logged in
    checkAuthStatus();

    // Check if OAuth callback occurred
    checkOAuthCallback();
  }, []);

  /** ✅ Check if user is logged in */
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await authService.getAuthStatus();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setError('Failed to check authentication status');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /** ✅ Handle OAuth callback after redirect */
  const checkOAuthCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthSuccess = urlParams.get('oauth_success');
    const oauthError = urlParams.get('oauth_error');

    if (oauthSuccess) {
      checkAuthStatus();
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (oauthError) {
      setError(`OAuth failed: ${oauthError}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  /** ✅ Initiate OAuth login */
  const login = async (provider: string) => {
    try {
      setLoading(true);
      setError(null);

      // Save where the user was before login
      const returnTo = window.location.pathname + window.location.search;
      localStorage.setItem('returnTo', returnTo);

      // Backend OAuth endpoint
      const backendUrl = `http://localhost:8000/api/auth/${provider}`;
      console.log(`Redirecting to ${backendUrl}`);
      window.location.href = backendUrl;
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to start login');
      setLoading(false);
    }
  };

  /** ✅ Logout and clear session */
  const logout = async () => {
    try {
      setLoading(true);
      const response = await authService.logout();
      if (response.success) {
        setUser(null);
      } else {
        setError('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/** ✅ Custom hook for easy usage */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
