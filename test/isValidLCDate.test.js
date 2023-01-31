const isValidLCDate = require('../utils/isValidLCDate');

let mockServerDate;
let mockServerHour;

test('Valid LC Date', () => {
  mockServerDate = '20210121';
  mockServerHour = 0;
  expect(isValidLCDate('20210121', mockServerDate, mockServerHour)).toBe(true);
});

test('Valid LC Date', () => {
  mockServerDate = '20210126';
  mockServerHour = 3;
  expect(isValidLCDate('20210126', mockServerDate, mockServerHour)).toBe(true);
});

test('Valid LC Date', () => {
  mockServerDate = '20210120';
  mockServerHour = 10;
  expect(isValidLCDate('20210120', mockServerDate, mockServerHour)).toBe(true);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210123';
  mockServerHour = 23;
  expect(isValidLCDate('20210124', mockServerDate, mockServerHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210127';
  mockhour = 0;
  expect(isValidLCDate('20210126', mockServerDate, mockServerHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210124';
  mockServerHour = 0;
  expect(isValidLCDate('20210125', mockServerDate, mockServerHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210122';
  mockServerHour = 0;
  expect(isValidLCDate('20210120', mockServerDate, mockServerHour)).toBe(false);
});

test('Invalid LC Date', () => {
  mockServerDate = '20210124';
  mockServerHour = 0;
  expect(isValidLCDate('20210126', mockServerDate, mockServerHour)).toBe(false);
});
