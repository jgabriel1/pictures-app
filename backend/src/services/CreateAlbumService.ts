import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Album } from '../models/Album';

interface IRequest {
  user_id: string;
  title: string;
  description: string;
}

export class CreateAlbumService {
  private albumsRepository: Repository<Album>;

  public constructor() {
    this.albumsRepository = getRepository(Album);
  }

  public async execute({
    user_id,
    title,
    description,
  }: IRequest): Promise<Partial<Album>> {
    const id = uuid();

    const album = this.albumsRepository.create({
      id,
      title,
      description,
      user_id,
      cover_url: '', // TODO
    });

    await this.albumsRepository.save(album);

    return {
      title: album.title,
      description: album.description,
    };
  }
}
