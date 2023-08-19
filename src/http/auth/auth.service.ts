import { Injectable } from '@nestjs/common';
import { HashLib } from '../../domain/@libs/hash.lib';

@Injectable()
export class AuthService {
  constructor(private readonly hash: HashLib) {}

  test() {
    return this.hash.sync('Hello World', 10);
  }
}
