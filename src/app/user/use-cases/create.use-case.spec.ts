import { HashMock } from '../__mocks__/hash.mock';
import { UserRepositoryInMemory } from '../__mocks__/user.repository.mock';
import { ICreateUserDto } from '../../../domain/user/dto/create-user.dto.interface';
import { CreateUseCase } from './create.use-case';

describe('CreateUseCase', () => {
  let userRepo: UserRepositoryInMemory;
  const hash = new HashMock();
  let sut: CreateUseCase;

  describe('execute', () => {
    beforeEach(() => {
      userRepo = new UserRepositoryInMemory();
      sut = new CreateUseCase(hash, userRepo);
    });

    it('should save a user', async () => {
      const payload = new ICreateUserDto('test@test.com', 'test', '123', '123');

      jest.spyOn(userRepo, 'insertOne');

      const response = await sut.execute(payload);

      expect(response).toBeUndefined();
      expect(userRepo.insertOne).toBeCalledTimes(1);
      expect(userRepo.insertOne).toBeCalledWith({
        ...payload,
        password: `successfully encrypted 123 in 10!`,
      });
    });
  });
});
