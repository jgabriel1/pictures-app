import { Image, ImageProps } from '@chakra-ui/react';

interface PictureImageProps extends ImageProps {
  imageId: string;
}

export const PictureImage = ({ imageId, ...imageProps }: PictureImageProps) => (
  <Image
    {...imageProps}
    src={`http://localhost:3333/static/uploads/${imageId}`}
    fallbackSrc="https://via.placeholder.com/200x150?text=my.Pictures"
  />
);
