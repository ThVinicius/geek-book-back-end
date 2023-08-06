import { ICreateUserDto } from '../dto/create-user.dto.interface';
import { IUser } from '../entities/user.entity.interface';
import { IUserRepository } from '../repositories/user.repository.interface';

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
