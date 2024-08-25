import { Dataset } from '../dataset/dataset';
import { Sampler } from './sampler';

export class RandomSampler extends Sampler<number> {
  constructor(dataset: Dataset<number>) {
    super(dataset);
  }

  override length(): number {
    return this.dataset.length();
  }

  override [Symbol.iterator](): Iterator<number, any, undefined> {
    const indexes = this.generateAndShuffle();

    let current = 0;
    const end = this.length();
    return {
      next: () => {
        if (current === end) {
          return { value: undefined, done: true };
        }
        const value = indexes[current];
        current++;
        return { value: value, done: false };
      },
    };
  }

  generateAndShuffle(): number[] {
    const min = 0;
    const max = this.length();
    const indexes: number[] = [];
    for (let i = min; i < max; i++) {
      indexes.push(i);
    }

    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    return indexes;
  }
}
