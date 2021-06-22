import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  Image,
} from '@chakra-ui/react';
import React from 'react';

export default function Albums() {
  const albums = Array(6).fill(null);

  return (
    <Container maxW="container.lg" h="100vh">
      <Flex flexDir="column" justify="space-between" h="100%">
        <Flex as="header" py="8" justify="space-between" align="center">
          <Heading as="h2" fontSize="4xl">
            my.Pictures
          </Heading>

          <HStack spacing="4">
            <Text fontSize="xl" fontWeight="medium">
              Olá, Gabriel
            </Text>

            <Button size="lg">Sair</Button>
          </HStack>
        </Flex>

        <Box as="main" flex="1" overflowY="auto">
          <Grid templateColumns="repeat(4, 1fr)" gap={8}>
            {albums.map(() => (
              <Box p="4" bg="gray.700" borderRadius="lg">
                <Image src="https://avatars.githubusercontent.com/u/62442043?v=4" />

                <Text fontSize="lg" fontWeight="medium" my="2">
                  Album
                </Text>

                <Text>Descrição desse album </Text>
              </Box>
            ))}
          </Grid>
        </Box>

        <Flex as="footer" align="center" justify="flex-end" pb="8" pt="4">
          <Button colorScheme="blue" size="lg">
            Criar novo álbum
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
