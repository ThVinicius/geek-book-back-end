import { ICreateUserDto } from '../dto/create-user.dto.interface';
import { IHash } from '../providers/hash.interface';
import { IUserRepository } from '../repositories/user.repository.interface';

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
