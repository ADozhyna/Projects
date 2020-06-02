import { SortingPipe } from './sorting.pipe';

describe('SortingPipe', () => {
  it('create an instance', () => {
    const pipe: SortingPipe = new SortingPipe();
    expect(pipe).toBeTruthy();
  });
});
