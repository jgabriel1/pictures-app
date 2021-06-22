import { Repository, getRepository } from 'typeorm';
import { Album } from '../../models/Album';

interface IRequest {
  album_id: string;
  data: {
    title?: string;
    description?: string;
  };
}

export class EditAlbumService {
  private albumsRepository: Repository<Album>;

  public constructor() {
    this.albumsRepository = getRepository(Album);
  }

  public async execute({ album_id, data }: IRequest): Promise<void> {
    const album = await this.albumsRepository.findOne(album_id);

    if (!album) return;

    // Edit record if there is input data
    album.title = data.title ?? album.title;
    album.description = data.description ?? album.description;

    await this.albumsRepository.save(album);
  }
}
