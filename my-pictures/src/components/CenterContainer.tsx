import { Box, Flex, BoxProps } from '@chakra-ui/react';

interface CenterContainerProps extends BoxProps {}

export const CenterContainer = (boxProps: CenterContainerProps) => (
  <Flex justify="center" align="center" h="100vh">
    <Box p="8" w="sm" borderRadius="lg" bg="gray.700" {...boxProps}>
      {boxProps.children}
    </Box>
  </Flex>
);
