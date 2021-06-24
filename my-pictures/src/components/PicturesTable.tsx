import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react';
import { isValidColor } from '../utils/isValidColor';

interface PicturesTableProps {
  pictures?: Array<{
    title: string;
    file_size: number;
    acquisition_date: string | Date;
    main_color: string;
  }>;
}

export const PicturesTable = ({ pictures }: PicturesTableProps) => (
  <Table>
    <Thead>
      <Tr>
        <Th>Foto</Th>
        <Th>Tamanho (Bytes)</Th>
        <Th>Data de aquisição</Th>
        <Th>Cor predominante</Th>
      </Tr>
    </Thead>

    <Tbody>
      {pictures &&
        pictures.map(picture => {
          const formattedDate = new Date(
            picture.acquisition_date
          ).toLocaleDateString('pt-BR');

          const isColorStringValid = isValidColor(picture.main_color);

          const color = isColorStringValid ? picture.main_color : 'inherit';

          return (
            <Tr>
              <Td>{picture.title}</Td>
              <Td>{picture.file_size}</Td>
              <Td>{formattedDate}</Td>
              <Td>
                <HStack>
                  <Text color={color}>{picture.main_color}</Text>

                  {isColorStringValid && (
                    <Box bg={color} w="3" h="3" borderRadius="sm" />
                  )}
                </HStack>
              </Td>
            </Tr>
          );
        })}
    </Tbody>

    <Tfoot />
  </Table>
);
