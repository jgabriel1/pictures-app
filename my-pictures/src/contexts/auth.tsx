import { createContext, FC, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { useRouter } from 'next/router';

interface LoginInformation {
  email: string;
  password: string;
}

interface LoginResponse {
  auth_token: string;
}

interface AuthContextData {
  login: (info: LoginInformation) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState('');

  const login = async ({ email, password }: LoginInformation) => {
    try {
      const { data } = await api.post<LoginResponse>('users/authenticate', {
        email,
        password,
      });

      setToken(data.auth_token);
    } catch {
      throw 'there was an error logging in';
    }
  };

  const logout = async () => {
    setToken('');
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers['Authorization'] = token;

      router.push('/albums');
    } else {
      router.push('/');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
