import { Flex, Heading, VStack, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { CenterContainer } from '../components/CenterContainer';
import { FormInput } from '../components/FormInput';

export default function SignUp() {
  return (
    <CenterContainer>
      <Flex flexDir="column" mb="8" align="center">
        <Heading as="h2" fontSize="4xl">
          my.Pictures
        </Heading>
      </Flex>

      <VStack spacing="4">
        <Text fontWeight="medium" fontSize="lg">
          Faça seu cadastro:
        </Text>

        <FormInput label="Nome" />

        <FormInput label="E-Mail" />

        <FormInput label="Senha" />
      </VStack>

      <Flex w="100%" justify="space-between" align="center" mt="8">
        <Button variant="ghost">Cancelar</Button>
        <Button size="lg" colorScheme="blue">
          Concluir
        </Button>
      </Flex>
    </CenterContainer>
  );
}
