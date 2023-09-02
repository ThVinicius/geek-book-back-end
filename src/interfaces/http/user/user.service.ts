import { Injectable } from '@nestjs/common';
import { CreateUseCase } from 'src/app/user/use-cases/create.use-case';
import { ICreateUserDto } from 'src/domain/user/dto/create-user.dto.interface';

@Injectable()
export class UserService {
  constructor(private readonly userCreate: CreateUseCase) {}

  async create(payload: ICreateUserDto) {
    return await this.userCreate.execute(payload);
  }
}
