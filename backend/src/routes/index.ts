import { Router } from 'express';
import { albumsRouter } from './albums.routes';
import { picturesRouter } from './pictures.routes';
import { usersRouter } from './users.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/albums', albumsRouter);
router.use('/pictures', picturesRouter);

export { router };
