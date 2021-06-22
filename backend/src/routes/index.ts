import { Router } from 'express';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { UsersController } from '../controllers/UsersController';
import { albumsRouter } from './albums.routes';
import { picturesRouter } from './pictures.routes';

const usersController = new UsersController();
const authenticationController = new AuthenticationController();

const router = Router();

router.post('/users/register', usersController.create);
router.post('/users/authenticate', authenticationController.create);

router.use('/albums', albumsRouter);
router.use('/pictures', picturesRouter);

export { router };
