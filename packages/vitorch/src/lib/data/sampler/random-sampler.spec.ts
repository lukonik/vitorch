import { Dataset } from '../dataset/dataset';
import { RandomSampler } from './random-sampler';

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

describe('randomSampler', () => {
  let dataset: DummyDataset;
  let sampler: RandomSampler;

  beforeEach(() => {
    dataset = new DummyDataset();
    sampler = new RandomSampler(dataset);

    // Mock Math.floor
    let callCount = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => {
      return [0.1, 0.5, 0.9, 0.2, 0.6, 0.8, 0.4, 0.7, 0.3, 0.0][callCount++];
    });
  });
  afterAll(() => {
    // Clean up the mock and restore the original implementation
    vi.restoreAllMocks();
  });

  it('Length is properly returned', () => {
    expect(sampler.length()).toBe(dataset.length());
  });
  it('iterates over all indices without repetition', () => {
    const result: number[] = [];
    for (const index of sampler) {
      result.push(index);
    }
    // Check that all indices from 0 to 9 are included
    expect(result.sort((a, b) => a - b)).toEqual([
      ...Array(DATA.length).keys(),
    ]);
  });

  it('produces a different order when randomization is varied', () => {
    const firstIteration: number[] = [];
    for (const index of sampler) {
      firstIteration.push(index);
    }

    // Reset and mock Math.random differently

    const secondIteration: number[] = [];
    for (const index of sampler) {
      secondIteration.push(index);
    }

    // Test that the second iteration is different from the first
    expect(firstIteration).not.toEqual(secondIteration);
  });
});
