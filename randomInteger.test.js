import { randomInteger } from './randomInteger';

test('randomInteger not null', () => {
  expect(randomInteger).toBeDefined();
});

test('randomInteger work', () => {
  const value = randomInteger(0, 10);
  expect(value).toBeGreaterThan(0);
  expect(value).toBeLessThan(10);
});

test('randomInteger work on min val', () => {
  const value = randomInteger(0, 0);
  
  expect(value).toBe(0);
});

test('randomInteger work on max val', () => {
  const value = randomInteger(10, 10);
  expect(value).toBe(10);
});