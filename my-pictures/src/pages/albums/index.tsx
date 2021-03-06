import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { PictureImageThumbnail } from '../../components/PictureImage';
import { ImageGrid } from '../../components/ImageGrid';
import { useAlbums } from '../../contexts/albums';
import {
  CreateNewAlbumModal,
  useNewAlbumModal,
} from '../../components/CreateNewAlbumModal';
import { withAuthRequired } from '../../utils/withAuthRequired';
import React from 'react';

export default function Albums() {
  const router = useRouter();

  const { albums } = useAlbums();

  const handleNavigateToAlbumPictures = (albumId: string) => {
    router.push(`/albums/${albumId}`);
  };

  const { isOpen, onClose, onOpen } = useNewAlbumModal();

  return (
    <Container maxW="container.lg" h="100vh">
      <Flex flexDir="column" justify="space-between" h="100%">
        <Header />

        <Box as="main" flex="1">
          {!albums ? (
            <Center h="full">
              <Spinner size="xl" />
            </Center>
          ) : albums.length === 0 ? (
            <Center h="full" flexDir="column" fontSize="sm" color="gray.400">
              <Text mb="2">Você ainda não possui nenhum álbum.</Text>

              <Text fontWeight="bold">Crie um novo álbum!</Text>
            </Center>
          ) : (
            <ImageGrid>
              {albums.map(album => (
                <Box
                  as="button"
                  textAlign="left"
                  _hover={{ cursor: 'pointer' }}
                  key={`albums:${album.id}`}
                  p="4"
                  bg="gray.700"
                  borderRadius="lg"
                  onClick={() => handleNavigateToAlbumPictures(album.id)}
                >
                  <PictureImageThumbnail
                    imageId={album.cover_picture_name}
                    alt={`${album.title}-cover`}
                  />

                  <Text fontSize="lg" fontWeight="medium" my="2">
                    {album.title}
                  </Text>

                  <Text>{album.description}</Text>
                </Box>
              ))}
            </ImageGrid>
          )}
        </Box>

        <Flex as="footer" align="center" justify="flex-end" pb="8" pt="4">
          <Button colorScheme="blue" size="lg" onClick={onOpen}>
            Criar novo álbum
          </Button>
        </Flex>
      </Flex>

      <CreateNewAlbumModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}

export const getServerSideProps = withAuthRequired(async () => {
  return {
    props: {},
  };
});
