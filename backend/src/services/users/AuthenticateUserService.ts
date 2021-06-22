import jwt from 'jsonwebtoken';
import { Repository, getRepository } from 'typeorm';
import { compare } from 'bcrypt';
import { AppError } from '../../errors/AppError';
import { User } from '../../models/User';
import config from '../../config';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  auth_token: string;
}

export class AuthenticateUserService {
  private usersRepository: Repository<User>;

  public constructor() {
    this.usersRepository = getRepository(User);
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Find user in database
    const user = await this.usersRepository.findOne({ email });

    if (!user)
      throw new AppError('E-mail not registered, please register first.');

    // Compare passwords
    const passwordsMatch = await compare(password, user.password_hash);

    if (!passwordsMatch) throw new AppError('Incorrect password.', 401);

    // Generate token
    const tokenPayload = {
      user_id: user.id,
    };

    const signedToken = jwt.sign(tokenPayload, config.jwtSecret, {
      expiresIn: 24 * 60 * 60, // 1 Day
    });

    return {
      auth_token: signedToken,
    };
  }
}
