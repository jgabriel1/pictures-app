import { Request, Response } from 'express';
import { CreateAlbumService } from '../services/CreateAlbumService';
import { DeleteAlbumService } from '../services/DeleteAlbumService';
import { EditAlbumService } from '../services/EditAlbumService';
import { ListAlbumsService } from '../services/ListAlbumsService';

export class AlbumsController {
  public async index(req: Request, res: Response) {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({
        error: 'Missing auth headers.',
      });

    const listAlbums = new ListAlbumsService();

    const albums = await listAlbums.execute({ user_id });

    return res.json({ albums });
  }

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

  public async delete(req: Request, res: Response) {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({
        error: 'Missing auth headers.',
      });

    const { album_id } = req.body;

    const deleteAlbum = new DeleteAlbumService();

    await deleteAlbum.execute({
      user_id,
      album_id,
    });

    return res.status(204);
  }

  public async update(req: Request, res: Response) {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({
        error: 'Missing auth headers.',
      });

    const { album_id, data } = req.body;

    const editAlbum = new EditAlbumService();

    await editAlbum.execute({
      album_id,
      data,
    });

    return res.status(204);
  }
}
