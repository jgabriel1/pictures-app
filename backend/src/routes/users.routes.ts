import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { checkAuthenticationMiddleware } from '../middlewares/checkAuthenticationMiddleware';

const usersController = new UsersController();
const authenticationController = new AuthenticationController();

const usersRouter = Router();

usersRouter.get('/me', checkAuthenticationMiddleware, usersController.show);

usersRouter.post('/register', usersController.create);

usersRouter.post('/authenticate', authenticationController.create);

export { usersRouter };
