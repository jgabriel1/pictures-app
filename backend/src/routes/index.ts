import { Router } from 'express';
import { AuthenticationController } from '../controllers/AuthenticationController';
import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();
const authenticationController = new AuthenticationController();

const router = Router();

router.post('/users/register', usersController.create);
router.post('/users/authenticate', authenticationController.create);

export { router };
