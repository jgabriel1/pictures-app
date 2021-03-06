import { Router } from 'express';
import { PicturesController } from '../controllers/PicturesController';
import { fileUploadMiddleware } from '../middlewares/fileUploadMiddleware';
import { checkAuthenticationMiddleware } from '../middlewares/checkAuthenticationMiddleware';

const picturesController = new PicturesController();

const picturesRouter = Router();

picturesRouter.use(checkAuthenticationMiddleware);

picturesRouter.get('/', picturesController.index);

picturesRouter.post(
  '/',
  fileUploadMiddleware('image'),
  picturesController.create
);

picturesRouter.delete('/:picture_id', picturesController.delete);

export { picturesRouter };
