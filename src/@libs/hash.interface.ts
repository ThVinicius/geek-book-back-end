export interface IHash {
  sync(text: string, saltRounds: number): string;
}
