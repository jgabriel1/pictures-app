import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AppError } from '../../errors/AppError';
import { Album } from '../../models/Album';
import { Picture } from '../../models/Picture';
import { StorageProvider } from '../../providers/StorageProvider';

interface IRequest {
  user_id: string;
  pictureData: {
    title: string;
    description: string;
    main_color: string;
    album_id: string;
    acquisition_date: Date;
  };
  fileData: {
    tempFileName: string;
    fileSize: number;
  };
}

export class UploadPictureService {
  private picturesRepository: Repository<Picture>;
  private albumsRepository: Repository<Album>;
  private storageProvider: StorageProvider;

  public constructor() {
    this.picturesRepository = getRepository(Picture);
    this.albumsRepository = getRepository(Album);
    this.storageProvider = new StorageProvider();
  }

  public async execute({
    user_id,
    pictureData,
    fileData,
  }: IRequest): Promise<Partial<Picture>> {
    // Check if the user owns the album
    const album = await this.albumsRepository.findOne(pictureData.album_id);

    if (user_id !== album?.user_id)
      throw new AppError(
        'This user is not allowed to upload pictures to this album',
        401
      );

    // Try to store the file
    let savedFileName: string;

    try {
      savedFileName = await this.storageProvider.saveFile(
        fileData.tempFileName
      );
    } catch {
      throw new AppError('There was an error storing the image.', 500);
    }

    // Save picture to the database
    const id = uuid();

    const { title, description, main_color, acquisition_date, album_id } =
      pictureData;

    const picture = this.picturesRepository.create({
      id,
      album_id,
      title,
      description,
      main_color,
      acquisition_date,
      file_size: fileData.fileSize,
      storage_name: savedFileName,
    });

    await this.picturesRepository.save(picture);

    return {
      id,
      title,
      description,
      main_color,
      acquisition_date,
      storage_name: picture.storage_name,
    };
  }
}
