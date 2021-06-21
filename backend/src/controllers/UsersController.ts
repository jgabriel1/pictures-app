import { Request, Response } from 'express';
import { RegisterUserService } from '../services/RegisterUserService';

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
}
