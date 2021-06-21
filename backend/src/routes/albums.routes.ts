import { Router } from 'express';
import { AlbumsController } from '../controllers/AlbumsController';
import { checkAuthenticationMiddleware } from '../middlewares/checkAuthenticationMiddleware';

const albumsController = new AlbumsController();

const albumsRouter = Router();

albumsRouter.post(
  '/albums',
  checkAuthenticationMiddleware,
  albumsController.create
);

export { albumsRouter };
