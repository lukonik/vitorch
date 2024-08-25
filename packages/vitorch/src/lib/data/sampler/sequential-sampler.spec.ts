import { Dataset } from '../dataset/dataset';
import { SequentialSampler } from './sequential-sampler';

const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

class DummyDataset extends Dataset<number> {
  data = DATA;

  override get(index: number): number {
    return this.data[index];
  }
  override length(): number {
    return this.data.length;
  }
  override getMany(indexes: number[]): number[] {
    return this.data.filter((_, i) => indexes.includes(i));
  }
}

describe('sequentialSampler', () => {
  let dataset: DummyDataset;
  let sampler: SequentialSampler;

  beforeEach(() => {
    dataset = new DummyDataset();
    sampler = new SequentialSampler(dataset);
  });
  it('Length is properly returned', () => {
    expect(sampler.length()).toBe(dataset.length());
  });
  it('iterating multiple times gives the same result', () => {
    const firstIteration: number[] = [];
    for (const index of sampler) {
      firstIteration.push(dataset.get(index));
    }
    expect(firstIteration).toEqual(DATA);

    // Reset and iterate again
    const secondIteration: number[] = [];
    for (const index of sampler) {
      secondIteration.push(dataset.get(index));
    }
    expect(secondIteration).toEqual(DATA);
  });
});
