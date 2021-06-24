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

interface NewAlbumFormData {
  title: string;
  description: string;
}

interface CreateNewAlbumModalProps extends Omit<ModalProps, 'children'> {}

export const CreateNewAlbumModal = ({
  ...modalProps
}: CreateNewAlbumModalProps) => {
  const toast = useToast({
    isClosable: true,
    duration: 3000,
  });

  const queryClient = useQueryClient();

  const { mutateAsync: createAlbum } = useMutation(
    async (data: NewAlbumFormData) => {
      try {
        await api.post('albums', {
          title: data.title,
          description: data.description,
        });
      } catch {
        toast({
          title: 'Erro ao criar álbum',
          description: `Ocorreu um erro inesperado ao criar o álbum ${data.title}`,
          status: 'error',
        });
      }
    }
  );

  const { register, handleSubmit, formState, reset } =
    useForm<NewAlbumFormData>();

  const handleSubmitNewAlbum = handleSubmit(async data => {
    await createAlbum({
      title: data.title,
      description: data.description,
    });

    toast({
      title: 'Novo álbum criado',
      description: `Album ${data.title} criado.`,
      status: 'success',
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

            <TextareaField
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
