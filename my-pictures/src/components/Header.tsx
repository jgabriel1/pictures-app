import { Button, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useAuth } from '../contexts/auth';
import { api } from '../services/api';

export const Header = () => {
  const { logout, isLoggedIn } = useAuth();

  const { data: userName } = useQuery<string>(
    'USER_NAME',
    async () => {
      const { data: responseData } = await api.get('users/me');

      return responseData.user.name;
    },
    { enabled: isLoggedIn }
  );

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Flex as="header" py="8" justify="space-between" align="center">
      <Heading as="h2" fontSize="4xl">
        my.Pictures
      </Heading>

      <HStack spacing="4">
        {userName && (
          <Text fontSize="xl" fontWeight="medium">
            {`Olá, ${userName}`}
          </Text>
        )}

        <Button size="lg" onClick={handleLogout}>
          Sair
        </Button>
      </HStack>
    </Flex>
  );
};
