import * as bcrypt from 'bcrypt';
import { IHash } from '../../domain/interfaces/libs/hash.interface';

export class HashLib implements IHash {
  sync(text: string, saltRounds: number): string {
    return bcrypt.hashSync(text, saltRounds);
  }
}
