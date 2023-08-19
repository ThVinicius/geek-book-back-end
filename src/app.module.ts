import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './@config/envs/env.validation';
import { AuthModule } from './http/auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env.production', '.env.development'],
    }),
    AuthModule,
    DatabaseModule,
  ],
})
export class AppModule {}
