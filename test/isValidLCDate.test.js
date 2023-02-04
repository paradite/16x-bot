const isValidLCDate = require('../utils/isValidLCDate');

let mockServerDate;

test('Valid LC Date', () => {
  mockServerDate = '20210121';
  expect(isValidLCDate('20210121', mockServerDate)).toBe(true);
});

test('Valid LC Date', () => {
  mockServerDate = '20210126';
  expect(isValidLCDate('20210126', mockServerDate)).toBe(true);
});

test('Valid LC Date', () => {
  mockServerDate = '20210120';
  expect(isValidLCDate('20210120', mockServerDate)).toBe(true);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210123';
  expect(isValidLCDate('20210124', mockServerDate)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210127';
  mockhour = 0;
  expect(isValidLCDate('20210126', mockServerDate)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210124';
  expect(isValidLCDate('20210125', mockServerDate)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210122';
  expect(isValidLCDate('20210120', mockServerDate)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210124';
  expect(isValidLCDate('20210126', mockServerDate)).toBe(false);
});
