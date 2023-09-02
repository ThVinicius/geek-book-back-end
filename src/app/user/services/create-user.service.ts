import { ICreateUserDto } from 'src/domain/user/dto/create-user.dto.interface';
import { CreateUseCase } from '../use-cases/create.use-case';

export class CreateUserService {
  constructor(private readonly createUser: CreateUseCase) {}

  async execute(payload: ICreateUserDto) {
    await this.createUser.execute(payload);
  }
}
