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
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { InputField } from './InputField';
import { format as formatDate } from 'date-fns';

interface NewPictureFormData {
  file: File;
  title: string;
  description: string;
  acquisition_date: string;
  main_color: string;
}

interface SendNewPictureModalProps extends Omit<ModalProps, 'children'> {}

export const SendNewPictureModal = ({
  ...modalProps
}: SendNewPictureModalProps) => {
  const { register, handleSubmit, formState, setValue, getValues, reset } =
    useForm<NewPictureFormData>();

  const handleSubmitNewPicture = handleSubmit(async data => {
    console.log(data);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: ([file]) => {
      setValue('file', file);
      setValue('title', file.name);
      setValue(
        'acquisition_date',
        formatDate(new Date(file.lastModified), "yyyy-MM-dd'T'hh:mm")
      );
    },
  });

  return (
    <Modal {...modalProps} size="lg">
      <ModalOverlay />

      <ModalContent as="form" onSubmit={handleSubmitNewPicture}>
        <ModalCloseButton />
        <ModalHeader>Adicionar nova foto</ModalHeader>

        <ModalBody>
          <VStack w="full">
            <Flex
              {...getRootProps()}
              w="full"
              border="2px"
              borderColor="gray.600"
              borderRadius="md"
              borderStyle="dashed"
              h="120"
              p="4"
              justify="center"
              align="center"
              bg={isDragActive ? 'whiteAlpha.100' : 'inherit'}
            >
              <input {...getInputProps()} />

              <Text fontWeight="semibold">
                {getValues().file ? getValues().file.name : 'Solte a foto aqui'}
              </Text>
            </Flex>

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
          <Button type="submit" colorScheme="blue">
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
