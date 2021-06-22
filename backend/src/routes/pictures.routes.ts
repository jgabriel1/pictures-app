import { Router } from 'express';
import { PicturesController } from '../controllers/PicturesController';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware';
import { checkAuthenticationMiddleware } from '../middlewares/checkAuthenticationMiddleware';

const picturesController = new PicturesController();

const picturesRouter = Router();

picturesRouter.use(checkAuthenticationMiddleware);

picturesRouter.post(
  '/',
  fileUploadMiddleware('image'),
  picturesController.create
);

export { picturesRouter };
