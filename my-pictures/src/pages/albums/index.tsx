import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  Image,
} from '@chakra-ui/react';
import { Header } from '../../components/Header';

export default function Albums() {
  const albums = Array(6).fill(null);

  return (
    <Container maxW="container.lg" h="100vh">
      <Flex flexDir="column" justify="space-between" h="100%">
        <Header />

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
