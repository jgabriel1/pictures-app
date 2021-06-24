import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Button,
  useToast,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../services/api';
import { PictureImage } from './PictureImage';

interface PictureDetail {
  id: string;
  title: string;
  description: string;
  storage_name: string;
}

interface PictureDetailModalProps extends Omit<ModalProps, 'children'> {
  picture: PictureDetail | null;
  albumId: string;
}

export const PictureDetailModal = ({
  picture,
  albumId,
  ...modalProps
}: PictureDetailModalProps) => {
  const modalSize = useBreakpointValue({
    base: 'md',
    md: 'full',
    lg: 'full',
  });

  const modalMargin = useBreakpointValue({
    base: 'inherit',
    md: '16',
    lg: '32',
  });

  const toast = useToast({
    isClosable: true,
    duration: 3000,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: deletePicture, isLoading: isDeleting } = useMutation(
    async () => {
      try {
        await api.delete(`pictures/${picture?.id}`);
      } catch {
        toast({
          status: 'error',
          title: 'Erro ao excluir foto',
          description: 'Ocorreu um erro ao excluir a foto, tente novamente.',
        });
      }
    }
  );

  const handleDeletePicture = async () => {
    await deletePicture();

    toast({
      status: 'success',
      title: 'Foto excluida com sucesso',
    });

    await queryClient.invalidateQueries(['PICTURES', albumId]);

    modalProps.onClose();
  };

  return (
    <Modal {...modalProps} size={modalSize}>
      <ModalOverlay />

      <ModalContent m={modalMargin}>
        <ModalCloseButton />

        <ModalHeader>{picture?.title}</ModalHeader>

        <Center flex="1">
          {picture && <PictureImage imageId={picture.storage_name} />}
        </Center>

        <ModalFooter>
          <Box w="full" h="full">
            <Text>{picture?.description}</Text>
          </Box>

          <Button
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={handleDeletePicture}
            isLoading={isDeleting}
          >
            Excluir Foto
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const usePictureDetail = () => {
  const [picture, setPicture] = useState<PictureDetail | null>(null);

  return {
    picture,
    isOpen: !!picture,
    onClose: () => setPicture(null),
    onOpen: (picture: PictureDetail) => setPicture(picture),
  };
};
