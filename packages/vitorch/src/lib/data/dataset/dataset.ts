export abstract class Dataset<T> {
  abstract get(index: number): T;
  abstract length(): number;
  abstract getMany(indexes: number[]): T[];
}
