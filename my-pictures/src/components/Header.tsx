import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { useAuth } from '../contexts/auth';

export const Header = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Flex as="header" py="8" justify="space-between" align="center">
      <Heading as="h2" fontSize="4xl">
        my.Pictures
      </Heading>

      <HStack spacing="4">
        <Text fontSize="xl" fontWeight="medium">
          Olá, Gabriel
        </Text>

        <Button size="lg" onClick={handleLogout}>
          Sair
        </Button>
      </HStack>
    </Flex>
  );
};
