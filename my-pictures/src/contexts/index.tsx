import { FC } from 'react';
import { AuthProvider } from './auth';
import { AlbumsProvider } from './albums';

export const AppProvider: FC = ({ children }) => {
  return (
    <AuthProvider>
      <AlbumsProvider>{children}</AlbumsProvider>
    </AuthProvider>
  );
};
