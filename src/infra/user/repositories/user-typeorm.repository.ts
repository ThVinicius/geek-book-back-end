import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUserDto } from 'src/domain/user/dto/create-user.dto.interface';
import { IUser } from 'src/domain/user/entities/user.entity.interface';
import { IUserRepository } from 'src/domain/user/repositories/user.repository.interface';
import { UserTypeorm } from '../entities/user-typeorm.entity';

export class UserTypeormRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserTypeorm)
    private readonly userRepo: Repository<UserTypeorm>,
  ) {}

  insertOne(data: Omit<ICreateUserDto, 'confirmPassword'>): Promise<IUser> {
    return this.userRepo.save(data);
  }
}
