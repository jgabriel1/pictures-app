import { Request, Response } from 'express';
import { RegisterUserService } from '../services/users';
import { ShowUserDataService } from '../services/users/ShowUserDataService';

export class UsersController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const registerUser = new RegisterUserService();

    const user = await registerUser.execute({
      name,
      email,
      password,
    });

    return res.status(201).json({ user });
  }

  public async show(req: Request, res: Response) {
    const { user_id } = req;

    console.log(user_id);

    const showUserData = new ShowUserDataService();

    const user = await showUserData.execute({
      user_id: user_id || '',
    });

    return res.json({ user });
  }
}
