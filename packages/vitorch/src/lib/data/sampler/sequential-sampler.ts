import { Dataset } from '../dataset/dataset';
import { Sampler } from './sampler';

/**
 * A sampler that returns the indices of a dataset sequentially.
 *
 * @example
 * const dataset = new DummyDataset();
 * const sampler = new SequentialSampler(dataset);
 *
 * for (const index of sampler) {
 *   console.log(index);  // Logs indices from 0 to dataset.length - 1
 * }
 */
export class SequentialSampler extends Sampler<number> {
  constructor(dataset: Dataset<number>) {
    super(dataset);
  }

  override length(): number {
    return this.dataset.length();
  }

  override [Symbol.iterator](): Iterator<number, any, undefined> {
    let current = 0;
    const end = this.length();
    return {
      next: () => {
        if (current === end) {
          return { value: undefined, done: true };
        }
        return { value: current++, done: false };
      },
    };
  }
}
