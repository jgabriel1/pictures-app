import { FC } from 'react';
import { AuthProvider } from './auth';

export const AppProvider: FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
