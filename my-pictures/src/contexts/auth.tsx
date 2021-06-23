import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { api } from '../services/api';

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

const TOKEN_STORAGE_KEY = '@my.Pictures:authToken';

export const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState(() => {
    const cookies = parseCookies();

    const storedToken = cookies[TOKEN_STORAGE_KEY];

    return storedToken;
  });

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

      setCookie(undefined, TOKEN_STORAGE_KEY, token);

      router.push('/albums');
    } else {
      destroyCookie(undefined, TOKEN_STORAGE_KEY);

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
