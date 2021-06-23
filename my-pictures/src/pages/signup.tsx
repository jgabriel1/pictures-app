import { Flex, Heading, VStack, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CenterContainer } from '../components/CenterContainer';
import { InputField } from '../components/InputField';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<SignUpFormData>();

  const handleSubmitSignUpForm = handleSubmit(data => {
    console.log(data);

    return new Promise(resolve => setTimeout(() => resolve(data), 1000));
  });

  const handleReturnToLogon = () => {
    router.back();
  };

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

        <InputField
          id="name"
          type="text"
          label="Nome"
          isInvalid={!!formState.errors.name}
          isRequiredError={formState.errors.name?.type === 'required'}
          {...register('name', { required: true })}
        />

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
        <Button variant="ghost" onClick={handleReturnToLogon}>
          Cancelar
        </Button>

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
