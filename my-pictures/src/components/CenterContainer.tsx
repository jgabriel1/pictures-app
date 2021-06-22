import { Box, Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface CenterContainerProps {
  children: ReactNode;
}

export const CenterContainer = ({ children }: CenterContainerProps) => (
  <Flex justify="center" align="center" h="100vh">
    <Box as="form" p="8" w="sm" borderRadius="lg" bg="gray.700">
      {children}
    </Box>
  </Flex>
);
