import { Table, Thead, Tr, Th, Tbody, Td, Tfoot } from '@chakra-ui/react';

interface PicturesTableProps {
  pictures?: Array<{
    title: string;
    file_size: number;
    acquisition_date: string | Date;
    main_color: string;
  }>;
}

export const PicturesTable = ({ pictures }: PicturesTableProps) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Foto</Th>
          <Th>Tamanho</Th>
          <Th>Data de aquisição</Th>
          <Th>Cor predominante</Th>
        </Tr>
      </Thead>

      <Tbody>
        {pictures &&
          pictures.map(picture => (
            <Tr>
              <Td>{picture.title}</Td>
              <Td>{picture.file_size}</Td>
              <Td>{picture.acquisition_date}</Td>
              <Td>{picture.main_color}</Td>
            </Tr>
          ))}
      </Tbody>

      <Tfoot />
    </Table>
  );
};
