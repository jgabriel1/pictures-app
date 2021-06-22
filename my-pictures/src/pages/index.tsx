import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { CenterContainer } from '../components/CenterContainer';
import { FormInput } from '../components/FormInput';

export default function Home() {
  const router = useRouter();

  const handleNavigateToSignUp = () => {
    router.push('signup');
  };

  return (
    <CenterContainer>
      <Flex flexDir="column" mb="8" align="center">
        <Heading as="h2" fontSize="4xl">
          my.Pictures
        </Heading>
      </Flex>

      <VStack spacing="4">
        <FormInput label="E-Mail" isRequired />

        <FormInput label="Senha" isRequired />
      </VStack>

      <Flex w="100%" justify="space-between" align="center" mt="8">
        <Button variant="ghost" onClick={handleNavigateToSignUp}>
          Cadastre-se
        </Button>

        <Button size="lg" colorScheme="blue" type="submit">
          Entrar
        </Button>
      </Flex>
    </CenterContainer>
  );
}
