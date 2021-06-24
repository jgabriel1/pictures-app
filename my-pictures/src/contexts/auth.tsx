import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useToast } from '@chakra-ui/react';
import { api } from '../services/api';

interface LoginInformation {
  email: string;
  password: string;
}

interface LoginResponse {
  auth_token: string;
}

interface AuthContextData {
  isLoggedIn: boolean;
  login: (info: LoginInformation) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const TOKEN_COOKIE_KEY = '@my.Pictures:authToken';

export const AuthProvider: FC = ({ children }) => {
  const toast = useToast({ isClosable: true, duration: 3000 });

  const router = useRouter();

  const [token, setToken] = useState(() => {
    const cookies = parseCookies();

    const storedToken = cookies[TOKEN_COOKIE_KEY];

    return storedToken;
  });

  const login = async ({ email, password }: LoginInformation) => {
    try {
      const { data } = await api.post<LoginResponse>('users/authenticate', {
        email,
        password,
      });

      setToken(data.auth_token);

      router.push('/albums');
    } catch {
      toast({
        status: 'error',
        title: 'Erro no login',
        description: 'Tente novamente.',
      });
    }
  };

  const logout = async () => {
    setToken('');

    router.push('/');
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      setCookie(undefined, TOKEN_COOKIE_KEY, token);
    } else {
      destroyCookie(undefined, TOKEN_COOKIE_KEY);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
