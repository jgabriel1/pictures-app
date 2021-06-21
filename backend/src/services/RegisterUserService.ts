import { getRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';
import { AppError } from '../errors/AppError';
import { User } from '../models/User';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

export class RegisterUserService {
  private usersRepository: Repository<User>;

  public constructor() {
    this.usersRepository = getRepository(User);
  }

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<Partial<User>> {
    // Check if name or email are taken
    const nameAlreadyTaken = await this.usersRepository.findOne({ name });

    if (!!nameAlreadyTaken)
      throw new AppError('This username is already taken', 400);

    const emailAlreadyTaken = await this.usersRepository.findOne({ email });

    if (!!emailAlreadyTaken)
      throw new AppError('This e-mail is already registered', 400);

    // Hash password
    const hashedPassword = await hash(password, 6);

    // Generate UUID
    const id = uuid();

    const user = this.usersRepository.create({
      id,
      name,
      email,
      password_hash: hashedPassword,
    });

    // Save user
    await this.usersRepository.save(user);

    return {
      name: user.name,
      email: user.email,
    };
  }
}
