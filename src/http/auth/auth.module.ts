import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashLib } from '../../domain/@libs/hash.lib';
import { HashProvider } from '../../@providers/hash.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashLib,
      useClass: HashProvider,
    },
  ],
})
export class AuthModule {}
