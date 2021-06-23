import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CenterContainer } from '../components/CenterContainer';
import { InputField } from '../components/InputField';
import { useAuth } from '../contexts/auth';

interface LogonFormData {
  email: string;
  password: string;
}

export default function Home() {
  const router = useRouter();

  const { login } = useAuth();

  const { register, handleSubmit, formState } = useForm<LogonFormData>();

  const handleNavigateToSignUp = () => {
    router.push('signup');
  };

  const handleSubmitLogonForm = handleSubmit(
    async data => {
      await login({
        email: data.email,
        password: data.password,
      });
    },
    error => {
      console.log(error);
    }
  );

  return (
    <CenterContainer as="form" onSubmit={handleSubmitLogonForm}>
      <Flex flexDir="column" mb="8" align="center">
        <Heading as="h2" fontSize="4xl">
          my.Pictures
        </Heading>
      </Flex>

      <VStack spacing="4">
        <InputField
          id="email"
          type="email"
          label="E-Mail"
          isInvalid={!!formState.errors.email}
          isRequiredError={formState.errors.email?.type === 'required'}
          {...register('email', { required: true })}
        />

        <InputField
          id="password"
          type="password"
          label="Senha"
          isInvalid={!!formState.errors.password}
          isRequiredError={formState.errors.password?.type === 'required'}
          {...register('password', { required: true })}
        />
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
