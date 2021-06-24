import { useBoolean } from '@chakra-ui/react';
import { createContext, FC, useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';
import { useAuth } from './auth';

interface Album {
  id: string;
  title: string;
  description: string;
  cover_picture_name: string;
}

interface AlbumsContextData {
  albums: Album[];
}

const AlbumsContext = createContext({} as AlbumsContextData);

export const AlbumsProvider: FC = ({ children }) => {
  const [shouldFetchAlbums, dispatchShouldFetch] = useBoolean(false);

  const { isLoggedIn } = useAuth();

  const { data: albums } = useQuery<Album[]>(
    'ALBUMS',
    async () => {
      const { data } = await api.get('albums');

      return data.albums;
    },
    { enabled: shouldFetchAlbums }
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatchShouldFetch.on();
    }
  }, [isLoggedIn]);

  return (
    <AlbumsContext.Provider value={{ albums: albums ?? [] }}>
      {children}
    </AlbumsContext.Provider>
  );
};

export const useAlbums = () => useContext(AlbumsContext);

export const useAlbum = (albumId: string) => {
  const { albums } = useAlbums();

  const album = albums.find(_album => _album.id === albumId);

  return album || null;
};
