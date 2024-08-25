import { Dataset } from '../dataset/dataset';

export abstract class Sampler<T> implements Iterable<T> {
  constructor(protected dataset: Dataset<any>) {}
  abstract [Symbol.iterator](): Iterator<T, any, undefined>;
  abstract length(): number;
}
