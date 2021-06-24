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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { api } from '../services/api';

interface EditAlbumFormData {
  title: string;
  description: string;
}

interface EditAlbumModalProps extends Omit<ModalProps, 'children'> {
  album: {
    id: string;
    title: string;
    description: string;
  };
}

export const EditAlbumModal = ({
  album,
  ...modalProps
}: EditAlbumModalProps) => {
  const toast = useToast({
    isClosable: true,
    duration: 3000,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: editAlbum } = useMutation(
    async (data: EditAlbumFormData) => {
      try {
        await api.patch(`albums/${album.id}`, { data });
      } catch {
        toast({
          title: 'Erro ao editar álbum',
          description: `Ocorreu um erro inesperado ao editar o álbum ${album.title}`,
          status: 'error',
        });
      }
    }
  );

  const { register, handleSubmit, formState, reset } =
    useForm<EditAlbumFormData>();

  const handleSubmitEditAlbum = handleSubmit(async data => {
    await editAlbum(data);

    toast({
      title: 'Álbum editado com sucesso',
      status: 'success',
    });

    await queryClient.invalidateQueries('ALBUMS');

    modalProps.onClose();
  });

  useEffect(() => {
    if (!modalProps.isOpen) {
      reset({
        title: album.title,
        description: album.description,
      });
    }
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} size="lg">
      <ModalOverlay />

      <ModalContent as="form" onSubmit={handleSubmitEditAlbum}>
        <ModalCloseButton />
        <ModalHeader>Editar Álbum</ModalHeader>

        <ModalBody>
          <VStack w="full">
            <InputField
              id="title"
              type="text"
              label="Título"
              defaultValue={album.title}
              isInvalid={!!formState.errors.title}
              isRequiredError={formState.errors.title?.type === 'required'}
              {...register('title', { required: true })}
            />

            <TextareaField
              id="description"
              type="textarea"
              label="Descrição"
              defaultValue={album.description}
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

export const useEditAlbumModal = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return { isOpen, onOpen, onClose };
};
