import {
  Container,
  Flex,
  Heading,
  HStack,
  Button,
  Text,
  Grid,
  Box,
  Image,
} from '@chakra-ui/react';
import React from 'react';

export default function Album() {
  const pictures = Array(6).fill(null);

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
          <Box mb="4">
            <Heading fontSize="2xl" mb="2">
              Album 1
            </Heading>

            <Text fontSize="md">
              Album 1 description Lorem ipsum dolor sit, amet consectetur
              adipisicing elit. Atque, mollitia aliquid error sed saepe vero
              aperiam id dolore voluptate unde tempora quae, voluptatibus
              doloremque tempore iusto! Doloribus nesciunt necessitatibus nemo.
            </Text>
          </Box>

          <Grid templateColumns="repeat(4, 1fr)" gap={8}>
            {pictures.map(() => (
              <Box
                p="4"
                bg="gray.700"
                borderRadius="lg"
                /*
                TODO: Click to open a modal with full picture, title on top and
                description on bottom
                */
              >
                <Image src="https://avatars.githubusercontent.com/u/62442043?v=4" />

                <Text fontSize="lg" fontWeight="medium" mt="2">
                  Picture
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
}
