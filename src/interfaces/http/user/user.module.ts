import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUseCase } from 'src/app/user/use-cases/create.use-case';
import { HashLib } from 'src/infra/libs/hash.lib';
import { UserTypeormRepository } from 'src/infra/user/repositories/user-typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeorm } from 'src/infra/user/entities/user-typeorm.entity';
import { CreateUserService } from 'src/app/user/services/create-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeorm])],
  controllers: [UserController],
  providers: [
    UserService,
    UserTypeormRepository,
    HashLib,
    {
      provide: CreateUseCase,
      useFactory: (hash: HashLib, userRepo: UserTypeormRepository) =>
        new CreateUseCase(hash, userRepo),
      inject: [HashLib, UserTypeormRepository],
    },
    {
      provide: CreateUserService,
      useFactory: (createUser: CreateUseCase) => {
        new CreateUserService(createUser);
      },
      inject: [CreateUseCase],
    },
  ],
})
export class UserModule {}
