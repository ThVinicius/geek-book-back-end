import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from '../config/envs/env.validation';
import { AuthModule } from './interfaces/http/auth/auth.module';
import { DatabaseModule } from './infra/database/database.module';
import { UserModule } from './interfaces/http/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env.production', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'geekbook',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      synchronize: false,
    }),
    AuthModule,
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
