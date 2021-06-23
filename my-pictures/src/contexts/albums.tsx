import { useBoolean } from '@chakra-ui/react';
import { createContext, FC, useContext } from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';

interface Album {
  id: string;
  title: string;
  description: string;
  cover_picture_name: string;
}

interface AlbumsContextData {
  albums: Album[];
  fetchAlbums: () => void;
}

const AlbumsContext = createContext({} as AlbumsContextData);

export const AlbumsProvider: FC = ({ children }) => {
  const [shouldFetchAlbums, dispatchShouldFetch] = useBoolean(false);

  const { data: albums } = useQuery<Album[]>(
    'ALBUMS',
    async () => {
      const { data } = await api.get('albums');

      return data.albums;
    },
    { enabled: shouldFetchAlbums }
  );

  const fetchAlbums = () => {
    dispatchShouldFetch.on();
  };

  return (
    <AlbumsContext.Provider value={{ albums: albums ?? [], fetchAlbums }}>
      {children}
    </AlbumsContext.Provider>
  );
};

export const useAlbums = () => useContext(AlbumsContext);

export const useAlbum = (albumId: string) => {
  const { albums } = useAlbums();

  const album = albums.find(_album => _album.id === albumId) as Album;

  return album;
};
