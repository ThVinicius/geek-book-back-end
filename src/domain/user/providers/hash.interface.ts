export interface IHash {
  sync(value: string, saltRounds: number): string;
}
