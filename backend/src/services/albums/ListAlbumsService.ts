import { Repository, getRepository } from 'typeorm';
import { Album } from '../../models/Album';

interface IRequest {
  user_id: string;
}

type IResponse = Omit<Album, 'user' | 'user_id'>[];

export class ListAlbumsService {
  private albumsRepository: Repository<Album>;

  public constructor() {
    this.albumsRepository = getRepository(Album);
  }

  public async execute({ user_id }: IRequest): Promise<IResponse> {
    const albums = await this.albumsRepository.find({
      user_id,
    });

    return albums.map(album => ({
      id: album.id,
      title: album.title,
      description: album.description,
      cover_url: album.cover_url,
    }));
  }
}
