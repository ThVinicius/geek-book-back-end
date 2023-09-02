import { IUserRepository } from 'src/domain/user/repositories/user.repository.interface';
import { ICreateUserDto } from '../../../domain/user/dto/create-user.dto.interface';
import { IUser } from '../../../domain/user/entities/user.entity.interface';

export class UserRepositoryInMemory implements IUserRepository {
  private users: IUser[] = [];

  async insertOne(
    data: Omit<ICreateUserDto, 'confirmPassword'>,
  ): Promise<IUser> {
    const id = this.users.length++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = null;

    const user = { id, ...data, createdAt, updatedAt, deletedAt };

    this.users.push(user);

    return user;
  }
}
