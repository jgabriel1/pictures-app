import { Repository, getRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { User } from '../../models/User';

interface IRequest {
  user_id: string;
}

export class ShowUserDataService {
  private usersRepository: Repository<User>;

  public constructor() {
    this.usersRepository = getRepository(User);
  }

  public async execute({ user_id }: IRequest): Promise<Partial<User>> {
    const user = await this.usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('This user does not exist.', 404);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
