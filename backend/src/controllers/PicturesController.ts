import { Request, Response } from 'express';
import {
  DeletePictureService,
  ListPicturesForAlbumService,
  UploadPictureService,
} from '../services/pictures';

export class PicturesController {
  public async index(req: Request, res: Response) {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({ error: 'Missing auth headers.' });

    const album_id = String(req.query.album_id);

    if (!album_id)
      return res.status(400).json({
        error: 'Missing album_id to find pictures.',
      });

    const listPictures = new ListPicturesForAlbumService();

    const pictures = await listPictures.execute({
      user_id,
      album_id,
    });

    return res.json({ pictures });
  }

  public async create(req: Request, res: Response) {
    const { user_id, file } = req;

    if (!user_id)
      return res.status(401).json({ error: 'Missing auth headers.' });

    if (!file)
      return res.status(400).json({
        error: 'Missing file upload.',
      });

    const { title, description, main_color, album_id, acquisition_date } =
      req.body;

    const uploadPicture = new UploadPictureService();

    const picture = await uploadPicture.execute({
      user_id,
      pictureData: {
        title,
        description,
        main_color,
        album_id,
        acquisition_date,
      },
      fileData: {
        fileSize: file.size,
        tempFileName: file.filename,
      },
    });

    return res.status(201).json({ picture });
  }

  public async delete(req: Request, res: Response) {
    const { user_id } = req;

    if (!user_id)
      return res.status(401).json({ error: 'Missing auth headers.' });

    const { picture_id } = req.params;

    const deletePicture = new DeletePictureService();

    await deletePicture.execute({
      user_id,
      picture_id,
    });

    return res.status(204).send();
  }
}
