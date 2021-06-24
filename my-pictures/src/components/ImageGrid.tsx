import {
  SimpleGrid,
  SimpleGridProps,
  useBreakpointValue,
} from '@chakra-ui/react';

interface ImageSimpleGridProps extends SimpleGridProps {}

export const ImageGrid = ({ children, ...gridProps }: ImageSimpleGridProps) => {
  const numberOfColumns = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
  });

  return (
    <SimpleGrid columns={numberOfColumns} gap={8} {...gridProps}>
      {children}
    </SimpleGrid>
  );
};
