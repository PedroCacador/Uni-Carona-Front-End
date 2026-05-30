import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authApi, type AuthResponse } from '../services/authApi';

export interface AuthUser {
  id: string;
  nome: string;
  email: string;
  curso: string;
  cpf?: string;
  whatsapp?: string;
  dataNascimento?: string;
  tipo?: 'passageiro' | 'motorista';
}

interface AuthContextData {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<AuthUser>) => void;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = 'http://localhost:3333';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
      }
    }
    setIsLoading(false);
  }, []);

  const persistAuth = (tokenValue: string, userValue: AuthUser) => {
    localStorage.setItem('token', tokenValue);
    localStorage.setItem('user', JSON.stringify(userValue));
    localStorage.setItem('userEmail', userValue.email);
    setToken(tokenValue);
    setUser(userValue);
  };

  const login = async (email: string, senha: string) => {
    const response: AuthResponse = await authApi.login({ email, senha });
    const userData: AuthUser = {
      id: response.usuario.id,
      nome: response.usuario.nome,
      email: response.usuario.email,
      curso: response.usuario.curso,
    };
    persistAuth(response.token, userData);
  };

  const register = async (data: any) => {
    await authApi.register(data);
    const response = await authApi.login({ email: data.email, senha: data.senha });
    const userData: AuthUser = {
      id: response.usuario.id,
      nome: response.usuario.nome,
      email: response.usuario.email,
      curso: response.usuario.curso,
    };
    persistAuth(response.token, userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    setToken(null);
    setUser(null);
  };

  const updateUser = (data: Partial<AuthUser>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
    }
  };

  const fetchUserProfile = useCallback(async () => {
    if (!user?.id || !token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const profileData = await response.json();
        const updated: AuthUser = {
          id: profileData.id,
          nome: profileData.nome,
          email: profileData.email,
          curso: profileData.curso,
          cpf: profileData.cpf,
          whatsapp: profileData.whatsapp,
          dataNascimento: profileData.dataNascimento,
        };
        setUser(updated);
        localStorage.setItem('user', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    }
  }, [user?.id, token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
