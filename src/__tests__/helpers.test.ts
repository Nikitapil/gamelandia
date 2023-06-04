import { shuffleArray, getUniqArrayObjects } from '../utils/helpers';

describe('helpers functions tests', () => {
  test('shuffle array', () => {
    const arr = [1, 2, 3, 4];
    expect(shuffleArray(arr).length).toBe(arr.length);
  });

  test('unique objects', () => {
    const arr = [{ a: 1, b: 2 }];
    expect(getUniqArrayObjects(arr)[0]).not.toBe(arr[0]);
  });
});
