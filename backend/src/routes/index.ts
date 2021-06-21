import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';

const usersController = new UsersController();

const router = Router();

router.post('/users/register', usersController.create);

export { router };