import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logoutUser as apiLogoutUser, verifyToken } from '../api';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthStatus = async () => {
    try {
      const isValid = await verifyToken();
      setIsLoggedIn(isValid);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    apiLogoutUser();
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  useEffect(() => {
    checkAuthStatus();

    // Listener para detectar mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accessToken' || e.key === 'refreshToken') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};