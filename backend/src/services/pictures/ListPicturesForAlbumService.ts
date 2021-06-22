import { Repository, getRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { Album } from '../../models/Album';
import { Picture } from '../../models/Picture';

interface IRequest {
  user_id: string;
  album_id: string;
}

type IResponse = Omit<Picture, 'album' | 'album_id'>[];

export class ListPicturesForAlbumService {
  public constructor(
    private picturesRepository: Repository<Picture> = getRepository(Picture),
    private albumsRepository: Repository<Album> = getRepository(Album)
  ) {}

  public async execute({ user_id, album_id }: IRequest): Promise<IResponse> {
    const album = await this.albumsRepository.findOne(album_id);

    if (user_id !== album?.user_id)
      throw new AppError(
        'Access denied: This user does not have access to these pictures',
        401
      );

    const pictures = await this.picturesRepository.find({ album_id });

    return pictures.map(picture => {
      const {
        id,
        description,
        acquisition_date,
        main_color,
        file_size,
        storage_name,
        title,
      } = picture;

      return {
        id,
        title,
        description,
        acquisition_date,
        main_color,
        file_size,
        storage_name,
      };
    });
  }
}
