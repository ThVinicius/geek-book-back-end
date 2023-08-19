import * as bcrypt from 'bcrypt';
import { IHash } from '../@libs/hash.interface';

export class HashProvider implements IHash {
  sync(text: string, saltRounds: number): string {
    return bcrypt.hashSync(text, saltRounds);
  }
}
