import { IHash } from '../../@libs/hash.interface';

export class HashLib {
  constructor(private readonly hashLib: IHash) {}

  sync(text: string, saltRounds: number): string {
    return this.hashLib.sync(text, saltRounds);
  }
}
