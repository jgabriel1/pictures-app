import { Repository, getRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { Album } from '../../models/Album';
import { Picture } from '../../models/Picture';
import { StorageProvider } from '../../providers/StorageProvider';

interface IRequest {
  user_id: string;
  picture_id: string;
}

export class DeletePictureService {
  public constructor(
    private picturesRepository: Repository<Picture> = getRepository(Picture),
    private albumsRepository: Repository<Album> = getRepository(Album),
    private storageProvider: StorageProvider = new StorageProvider()
  ) {}

  public async execute({ user_id, picture_id }: IRequest): Promise<void> {
    const picture = await this.picturesRepository.findOne(picture_id);

    if (!picture) return;

    // Check if user has permission
    const album = await this.albumsRepository.findOne(picture.album_id);

    if (user_id !== album?.user_id)
      throw new AppError('User is not allowed to delete this picture.', 401);

    // Delete picture data from database
    const { storage_name } = picture;

    await this.picturesRepository.delete(picture);

    // Delete file from storage
    await this.storageProvider.deleteFile(storage_name);
  }
}
