import { Request, Response } from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export class AuthenticationController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { auth_token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.status(200).json({ auth_token });
  }
}
