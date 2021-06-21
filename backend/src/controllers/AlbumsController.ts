import { Request, Response } from 'express';
import { CreateAlbumService } from '../services/CreateAlbumService';

export class AlbumsController {
  public async create(req: Request, res: Response) {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({
        error: 'Missing auth headers.',
      });

    const { title, description } = req.body;

    const createAlbum = new CreateAlbumService();

    const album = await createAlbum.execute({
      user_id,
      title,
      description,
    });

    return res.status(201).json({ album });
  }
}
