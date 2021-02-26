import { asyncPipe } from './async-pipe';

const asyncDouble = (n: number) => Promise.resolve(n * 2);
const asyncInc = (n: number) => Promise.resolve(n + 1);

describe('asyncPipe', () => {
  it('given two promises: should pipe them', async () => {
    const actual = await asyncPipe(asyncInc, asyncDouble)(20);
    const expected = 42;

    expect(actual).toEqual(expected);
  });
});
