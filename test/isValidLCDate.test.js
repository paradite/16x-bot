const isValidLCDate = require('../utils/isValidLCDate');

let mockDate;
let mockHour;

test('Valid LC Date', () => {
  mockDate = '20210121';
  mockHour = 0;
  expect(isValidLCDate('20210121', mockDate, mockHour)).toBe(true);
});

test('Valid LC Date', () => {
  mockDate = '20210126';
  mockHour = 3;
  expect(isValidLCDate('20210126', mockDate, mockHour)).toBe(true);
});

test('Valid LC Date', () => {
  mockDate = '20210120';
  mockHour = 10;
  expect(isValidLCDate('20210120', mockDate, mockHour)).toBe(true);
});

test('Invalid LC Date', () => {
  mockDate = '20210123';
  mockHour = 23;
  expect(isValidLCDate('20210124', mockDate, mockHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockDate = '20210127';
  mockhour = 0;
  expect(isValidLCDate('20210126', mockDate, mockHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockDate = '20210124';
  mockHour = 0;
  expect(isValidLCDate('20210125', mockDate, mockHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockDate = '20210122';
  mockHour = 0;
  expect(isValidLCDate('20210120', mockDate, mockHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockDate = '20210124';
  mockHour = 0;
  expect(isValidLCDate('20210126', mockDate, mockHour)).toBe(false);
});
