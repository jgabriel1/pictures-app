import {
  Button,
  Flex,
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
  Text,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useDropzone } from 'react-dropzone';
import { getPalette } from 'react-palette';
import { format as formatDate } from 'date-fns';
import { InputField } from './InputField';
import { TextareaField } from './TextareaField';
import { api } from '../services/api';

interface NewPictureFormData {
  image: File;
  title: string;
  description: string;
  acquisition_date: string;
  main_color: string;
}

interface SendNewPictureModalProps extends Omit<ModalProps, 'children'> {
  albumId: string;
}

export const SendNewPictureModal = ({
  albumId,
  ...modalProps
}: SendNewPictureModalProps) => {
  const toast = useToast({ duration: 3000, isClosable: true });

  const queryClient = useQueryClient();

  const { register, handleSubmit, formState, setValue, getValues, reset } =
    useForm<NewPictureFormData>();

  const handleSubmitNewPicture = handleSubmit(async data => {
    try {
      const formData = new FormData();

      formData.set('image', data.image);
      formData.set('title', data.title);
      formData.set('description', data.description);
      formData.set('acquisition_date', data.acquisition_date);
      formData.set('main_color', data.main_color);
      formData.set('album_id', albumId);

      await api.post('pictures', formData);

      toast({
        status: 'success',
        title: 'Foto enviada com sucesso.',
      });

      // Signal to reload all pictures for this album
      await queryClient.invalidateQueries({
        queryKey: ['PICTURES', albumId],
      });

      modalProps.onClose();
    } catch {
      toast({
        status: 'error',
        title: 'Erro no envio da foto',
        description: 'Ocorreu um erro no envio da foto, tente novamente',
      });
    }
  });

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDropAccepted: async ([image]) => {
        setValue('image', image);
        setValue('title', image.name);
        setValue(
          'acquisition_date',
          formatDate(new Date(image.lastModified), "yyyy-MM-dd'T'hh:mm")
        );

        const { vibrant } = await getPalette(URL.createObjectURL(image));

        setValue('main_color', vibrant || '');
      },
      maxFiles: 1, // Only allow a single file to be sent
      accept: 'image/jpeg, image/png', // Accepted file types
    });

  useEffect(() => {
    if (!modalProps.isOpen)
      reset({
        image: undefined,
        title: '',
        description: '',
        main_color: '',
        acquisition_date: '',
      });
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} size="lg">
      <ModalOverlay />

      <ModalContent as="form" onSubmit={handleSubmitNewPicture}>
        <ModalCloseButton />
        <ModalHeader>Adicionar nova foto</ModalHeader>

        <ModalBody>
          <VStack w="full">
            <FormControl isInvalid={isDragReject}>
              <Flex
                {...getRootProps()}
                w="full"
                border="2px"
                borderColor="gray.600"
                borderRadius="md"
                borderStyle="dashed"
                h="160"
                p="4"
                justify="center"
                align="center"
                bg={isDragActive ? 'whiteAlpha.100' : 'inherit'}
              >
                <input {...getInputProps()} />

                <Text fontWeight="semibold">
                  {getValues().image
                    ? getValues().image.name
                    : 'Solte a foto aqui'}
                </Text>
              </Flex>

              <FormErrorMessage>
                Por favor envie uma imagem nos formatos .jpg ou .png
              </FormErrorMessage>
            </FormControl>

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

            <InputField
              id="acquisition_date"
              type="datetime-local"
              label="Data/Hora de aquisição"
              isInvalid={!!formState.errors.acquisition_date}
              isRequiredError={
                formState.errors.acquisition_date?.type === 'required'
              }
              {...register('acquisition_date', { required: true })}
            />

            <InputField
              id="main_color"
              type="text"
              label="Cor predominante"
              isInvalid={!!formState.errors.main_color}
              isRequiredError={formState.errors.main_color?.type === 'required'}
              {...register('main_color', { required: true })}
            />
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={formState.isSubmitting}
          >
            Enviar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const useNewPictureModal = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return { isOpen, onOpen, onClose };
};
