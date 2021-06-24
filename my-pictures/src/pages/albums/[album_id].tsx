import {
  Container,
  Flex,
  Heading,
  Text,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Header } from '../../components/Header';
import { PictureImageThumbnail } from '../../components/PictureImage';
import { PicturesTable } from '../../components/PicturesTable';
import { ImageGrid } from '../../components/ImageGrid';
import {
  PictureDetailModal,
  usePictureDetail,
} from '../../components/PictureDetailModal';
import {
  SendNewPictureModal,
  useNewPictureModal,
} from '../../components/SendNewPictureModal';
import { useAlbum } from '../../contexts/albums';
import { api } from '../../services/api';
import { withAuthRequired } from '../../utils/withAuthRequired';

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
  const toast = useToast({ isClosable: true, duration: 3000 });

  const queryClient = useQueryClient();

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

  const [albumViewMode, setAlbumViewMode] = useState<'GRID' | 'TABLE'>('GRID');

  const newPictureModal = useNewPictureModal();

  const pictureDetail = usePictureDetail();

  const { mutateAsync: deleteAlbum, isLoading: isDeletingAlbum } = useMutation(
    async () => {
      try {
        await api.delete(`albums/${album_id}`);
      } catch {
        toast({
          status: 'error',
          title: 'Erro ao excluir álbum.',
        });
      }
    }
  );

  const handleDeleteAlbum = async () => {
    // Soft check for business rule, the backend won't allow this
    if (pictures && pictures.length > 0) {
      return toast({
        status: 'error',
        title: 'Erro ao excluir álbum',
        description: 'Não é possível excluir um álbum que não esteja vazio.',
      });
    }

    await deleteAlbum();

    router.back();

    await queryClient.invalidateQueries('ALBUMS');

    toast({
      status: 'success',
      title: 'Álbum excluído com sucesso.',
    });
  };

  return (
    <Container maxW="container.lg" h="100vh">
      <Flex flexDir="column" justify="space-between" h="100%">
        <Header />

        <Box as="main" flex="1" overflowY="auto">
          <Flex w="full" justify="space-between" align="center" mb="8">
            <Box>
              <Heading fontSize="2xl" mb="2">
                {album?.title}
              </Heading>

              <Text fontSize="md">{album?.description}</Text>
            </Box>

            <Menu>
              <MenuButton as={Button} mr="2">
                Visualização
              </MenuButton>

              <MenuList minW="150">
                <MenuOptionGroup
                  type="radio"
                  value={albumViewMode}
                  onChange={v => setAlbumViewMode(v as 'GRID' | 'TABLE')}
                >
                  <MenuItemOption value="GRID">Miniaturas</MenuItemOption>
                  <MenuItemOption value="TABLE">Tabela</MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </Flex>

          {albumViewMode === 'GRID' ? (
            <ImageGrid>
              {pictures &&
                pictures.map(picture => (
                  <Box
                    as="button"
                    textAlign="left"
                    _hover={{ cursor: 'pointer' }}
                    key={`pictures:${picture.id}`}
                    p="4"
                    bg="gray.700"
                    borderRadius="lg"
                    onClick={() => pictureDetail.onOpen(picture)}
                  >
                    <Flex flexDir="column" h="full" justify="space-between">
                      <PictureImageThumbnail imageId={picture.storage_name} />

                      <Text fontSize="lg" fontWeight="medium" mt="2">
                        {picture.title}
                      </Text>
                    </Flex>
                  </Box>
                ))}
            </ImageGrid>
          ) : (
            <PicturesTable pictures={pictures} />
          )}
        </Box>

        <Flex as="footer" align="center" justify="space-between" pb="8" pt="4">
          <Button
            colorScheme="red"
            variant="ghost"
            size="md"
            onClick={handleDeleteAlbum}
            isLoading={isDeletingAlbum}
          >
            Excluir álbum
          </Button>

          <Button colorScheme="blue" size="lg" onClick={newPictureModal.onOpen}>
            Adicionar foto
          </Button>
        </Flex>
      </Flex>

      <SendNewPictureModal albumId={album_id} {...newPictureModal} />

      <PictureDetailModal albumId={album_id} {...pictureDetail} />
    </Container>
  );
}

export const getServerSideProps = withAuthRequired(async () => {
  return {
    props: {},
  };
});
