// src/hooks/useAuth.tsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthService, User, userFromUserID } from '../services/authService';


interface AuthContextType
{
    user : User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

// Create the context with an undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) =>
{
    const [userID, setUser] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isAuthenticated());

// Initialize auth state if available
    useEffect(() => {

        const storedUserID = AuthService.getUser();
        if (storedUserID)
        {
            console.debug(`Logged in user: ${storedUserID}`)
            setUser(storedUserID);
        }

        setIsAuthenticated(AuthService.isAuthenticated());
    }, []);

    const login = async (email: string, password: string) => {
    const success = await AuthService.login({ email, password });
    setIsAuthenticated(success);
    return success;
  };

  const register = async (email: string, password: string) => {
    return AuthService.register({ email, password });
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null)
  };

  const value =
  {
    user : userFromUserID(userID),
    isAuthenticated,
    login,
    register,
    logout,
  };

    return React.createElement(
        AuthContext.Provider,
        { value },
        children
    );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
