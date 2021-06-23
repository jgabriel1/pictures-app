import {
  Container,
  Flex,
  Heading,
  Text,
  Grid,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Header } from '../../components/Header';
import { PictureImage } from '../../components/PictureImage';
import { PicturesTable } from '../../components/PicturesTable';
import {
  SendNewPictureModal,
  useNewPictureModal,
} from '../../components/SendNewPictureModal';
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

  const [albumViewMode, setAlbumViewMode] = useState<'GRID' | 'TABLE'>('GRID');

  const { isOpen, onClose, onOpen } = useNewPictureModal();

  return (
    <Container maxW="container.lg" h="100vh">
      <Flex flexDir="column" justify="space-between" h="100%">
        <Header />

        <Box as="main" flex="1" overflowY="auto">
          <Flex w="full" justify="space-between" align="center" mb="8">
            <Box>
              <Heading fontSize="2xl" mb="2">
                {album.title}
              </Heading>

              <Text fontSize="md">{album.description}</Text>
            </Box>

            <Menu>
              <MenuButton as={Button} mr="2">
                Visualização
              </MenuButton>

              <MenuList minW="150" onChange={console.log}>
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
            <Grid templateColumns="repeat(3, 1fr)" gap={8}>
              {pictures &&
                pictures.map(picture => (
                  <Box
                    key={`pictures:${picture.id}`}
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
          ) : (
            <PicturesTable pictures={pictures} />
          )}
        </Box>

        <Flex as="footer" align="center" justify="flex-end" pb="8" pt="4">
          <Button colorScheme="blue" size="lg" onClick={onOpen}>
            Adicionar foto
          </Button>
        </Flex>
      </Flex>

      <SendNewPictureModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
