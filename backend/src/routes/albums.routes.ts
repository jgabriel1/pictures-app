import { Router } from 'express';
import { AlbumsController } from '../controllers/AlbumsController';
import { checkAuthenticationMiddleware } from '../middlewares/checkAuthenticationMiddleware';

const albumsController = new AlbumsController();

const albumsRouter = Router();

albumsRouter.get('/', checkAuthenticationMiddleware, albumsController.index);

albumsRouter.post('/', checkAuthenticationMiddleware, albumsController.create);

albumsRouter.delete(
  '/:album_id',
  checkAuthenticationMiddleware,
  albumsController.delete
);

albumsRouter.patch(
  '/:album_id',
  checkAuthenticationMiddleware,
  albumsController.update
);

export { albumsRouter };
