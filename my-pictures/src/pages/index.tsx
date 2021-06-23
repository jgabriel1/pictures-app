import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CenterContainer } from '../components/CenterContainer';

interface LogonFormData {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<LogonFormData>();

  const handleNavigateToSignUp = () => {
    router.push('signup');
  };

  const handleSubmitLogonForm = handleSubmit(data => {
    console.log(data);

    return new Promise(resolve => setTimeout(() => resolve(data), 1000));
  });

  return (
    <CenterContainer as="form" onSubmit={handleSubmitLogonForm}>
      <Flex flexDir="column" mb="8" align="center">
        <Heading as="h2" fontSize="4xl">
          my.Pictures
        </Heading>
      </Flex>

      <VStack spacing="4">
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
        <Button variant="ghost" onClick={handleNavigateToSignUp}>
          Cadastre-se
        </Button>

        <Button
          size="lg"
          colorScheme="blue"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </CenterContainer>
  );
}
