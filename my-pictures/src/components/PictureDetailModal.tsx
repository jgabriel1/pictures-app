import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
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
  const queryClient = useQueryClient();

  const { mutateAsync: deletePicture, isLoading: isDeleting } = useMutation(
    async () => {
      await api.delete(`pictures/${picture?.id}`);
    }
  );

  const handleDeletePicture = async () => {
    await deletePicture();

    await queryClient.invalidateQueries(['PICTURES', albumId]);

    modalProps.onClose();
  };

  return (
    <Modal {...modalProps} size="full">
      <ModalOverlay />

      <ModalContent m="32">
        <ModalCloseButton />

        <ModalHeader>{picture?.title}</ModalHeader>

        <ModalBody>
          {picture && <PictureImage imageId={picture.storage_name} />}
        </ModalBody>

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
