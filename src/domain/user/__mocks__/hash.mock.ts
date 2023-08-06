import { IHash } from '../providers/hash.interface';

export class HashMock implements IHash {
  sync(value: string, saltRounds: number): string {
    return `successfully encrypted ${value} in ${saltRounds}!`;
  }
}
