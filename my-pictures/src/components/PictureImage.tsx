import { AspectRatio, Image, ImageProps } from '@chakra-ui/react';

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

export const PictureImageThumbnail = ({
  imageId,
  ...imageProps
}: PictureImageProps) => (
  <AspectRatio maxW="full" ratio={4 / 3}>
    <PictureImage imageId={imageId} {...imageProps} />
  </AspectRatio>
);
