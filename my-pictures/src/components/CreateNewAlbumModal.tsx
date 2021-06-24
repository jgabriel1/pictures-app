import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { api } from '../services/api';
import { InputField } from './InputField';

interface NewAlbumFormData {
  title: string;
  description: string;
}

interface CreateNewAlbumModalProps extends Omit<ModalProps, 'children'> {}

export const CreateNewAlbumModal = ({
  ...modalProps
}: CreateNewAlbumModalProps) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState, reset } =
    useForm<NewAlbumFormData>();

  const handleSubmitNewAlbum = handleSubmit(async data => {
    await api.post('albums', {
      title: data.title,
      description: data.description,
    });

    await queryClient.invalidateQueries({ queryKey: 'ALBUMS' });

    modalProps.onClose();
  });

  useEffect(() => {
    if (!modalProps.isOpen) {
      reset({ title: '', description: '' });
    }
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} size="lg">
      <ModalOverlay />

      <ModalContent as="form" onSubmit={handleSubmitNewAlbum}>
        <ModalCloseButton />
        <ModalHeader>Criar novo álbum</ModalHeader>

        <ModalBody>
          <VStack w="full">
            <InputField
              id="title"
              type="text"
              label="Título"
              isInvalid={!!formState.errors.title}
              isRequiredError={formState.errors.title?.type === 'required'}
              {...register('title', { required: true })}
            />

            <InputField
              id="description"
              type="textarea"
              label="Descrição"
              isInvalid={!!formState.errors.description}
              isRequiredError={
                formState.errors.description?.type === 'required'
              }
              {...register('description', { required: true })}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formState.isSubmitting}
          >
            Concluir
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const useNewAlbumModal = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return { isOpen, onOpen, onClose };
};
