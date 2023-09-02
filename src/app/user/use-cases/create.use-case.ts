import { IUserRepository } from 'src/domain/user/repositories/user.repository.interface';
import { ICreateUserDto } from '../../../domain/user/dto/create-user.dto.interface';
import { IHash } from 'src/domain/interfaces/libs/hash.interface';

export class CreateUseCase {
  constructor(
    private readonly hash: IHash,
    private readonly userRepo: IUserRepository,
  ) {}

  async execute(payload: ICreateUserDto) {
    const saltRounds = 10;

    const password = this.hash.sync(payload.password, saltRounds);

    await this.userRepo.insertOne({ ...payload, password });
  }
}
