import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './@config/envs/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: ['.env.production', '.env.development'],
    }),
  ],
})
export class AppModule {}
