import { Container, Flex, Heading, Text, Grid, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Header } from '../../components/Header';
import { PictureImage } from '../../components/PictureImage';
import { useAlbum } from '../../contexts/albums';
import { api } from '../../services/api';

interface Picture {
  id: string;
  title: string;
  description: string;
  acquisition_date: string;
  main_color: string;
  file_size: number;
  storage_name: string;
}

export default function Album() {
  const router = useRouter();

  const album_id = router.query.album_id as string;

  const album = useAlbum(album_id);

  const { data: pictures } = useQuery<Picture[]>(
    ['PICTURES', album_id],
    async () => {
      const { data: responseData } = await api.get('pictures', {
        params: { album_id },
      });

      return responseData.pictures;
    }
  );

  return (
    <Container maxW="container.lg" h="100vh">
      <Flex flexDir="column" justify="space-between" h="100%">
        <Header />

        <Box as="main" flex="1" overflowY="auto">
          <Box mb="4">
            <Heading fontSize="2xl" mb="2">
              {album.title}
            </Heading>

            <Text fontSize="md">{album.description}</Text>
          </Box>

          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            {pictures &&
              pictures.map(picture => (
                <Box
                  p="4"
                  bg="gray.700"
                  borderRadius="lg"
                  /*
                TODO: Click to open a modal with full picture, title on top and
                description on bottom
                */
                >
                  <PictureImage imageId={picture.storage_name} />

                  <Text fontSize="lg" fontWeight="medium" mt="2">
                    {picture.title}
                  </Text>
                </Box>
              ))}
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
}
