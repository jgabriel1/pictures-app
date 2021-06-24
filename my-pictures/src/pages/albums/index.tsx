import { Box, Button, Container, Flex, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { PictureImageThumbnail } from '../../components/PictureImage';
import { useAlbums } from '../../contexts/albums';
import {
  CreateNewAlbumModal,
  useNewAlbumModal,
} from '../../components/CreateNewAlbumModal';
import { withAuthRequired } from '../../utils/withAuthRequired';

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

        <Box as="main" flex="1" overflowY="auto">
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            {albums &&
              albums.map(album => (
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
          </Grid>
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
