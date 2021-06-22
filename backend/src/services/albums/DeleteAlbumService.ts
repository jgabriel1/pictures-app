import { Repository, getRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { Album } from '../../models/Album';
import { Picture } from '../../models/Picture';

interface IRequest {
  user_id: string;
  album_id: string;
}

export class DeleteAlbumService {
  private albumsRepository: Repository<Album>;
  private picturesRepository: Repository<Picture>;

  public constructor() {
    this.albumsRepository = getRepository(Album);
    this.picturesRepository = getRepository(Picture);
  }

  public async execute({ user_id, album_id }: IRequest): Promise<void> {
    // Check if user_id matches with album owner
    const album = await this.albumsRepository.findOne(album_id);

    if (!album || album.user_id !== user_id) return;

    // Check if album is empty in order to delete
    const picturesCount = await this.picturesRepository.count({
      album_id,
    });

    if (picturesCount > 0)
      throw new AppError('Cannot delete album that still has pictures.', 400);

    await this.albumsRepository.delete(album);
  }
}
