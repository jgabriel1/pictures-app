import {
  Flex,
  Heading,
  VStack,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CenterContainer } from '../components/CenterContainer';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm<SignUpFormData>();

  const handleSubmitSignUpForm = handleSubmit(data => {
    console.log(data);

    return new Promise(resolve => setTimeout(() => resolve(data), 1000));
  });

  return (
    <CenterContainer as="form" onSubmit={handleSubmitSignUpForm}>
      <Flex flexDir="column" mb="8" align="center">
        <Heading as="h2" fontSize="4xl">
          my.Pictures
        </Heading>
      </Flex>

      <VStack spacing="4">
        <Text fontWeight="medium" fontSize="lg">
          Faça seu cadastro:
        </Text>

        <FormControl id="name" isInvalid={!!formState.errors.name}>
          <FormLabel>Nome</FormLabel>

          <Input {...register('name', { required: true })} />

          <FormErrorMessage>
            {formState.errors.name?.type === 'required' && 'Campo Obrigatório'}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="email" isInvalid={!!formState.errors.email}>
          <FormLabel>E-Mail</FormLabel>

          <Input type="email" {...register('email', { required: true })} />

          <FormErrorMessage>
            {formState.errors.email?.type === 'required' && 'Campo Obrigatório'}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="password" isInvalid={!!formState.errors.password}>
          <FormLabel>Senha</FormLabel>

          <Input
            type="password"
            {...register('password', { required: true })}
          />

          <FormErrorMessage>
            {formState.errors.password?.type === 'required' &&
              'Campo Obrigatório'}
          </FormErrorMessage>
        </FormControl>
      </VStack>

      <Flex w="100%" justify="space-between" align="center" mt="8">
        <Button variant="ghost">Cancelar</Button>
        <Button
          size="lg"
          type="submit"
          colorScheme="blue"
          isLoading={formState.isSubmitting}
        >
          Concluir
        </Button>
      </Flex>
    </CenterContainer>
  );
}
