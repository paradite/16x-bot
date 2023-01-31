const dayjs = require('dayjs');
let isBetween = require('dayjs/plugin/isBetween');
let utc = require('dayjs/plugin/utc');
dayjs.extend(isBetween);
dayjs.extend(utc);

function isValidLCDate(resp, mockDate, mockHour) {
  let submissionHour, leftBound, rightBound;
  if (mockDate == undefined && mockHour == undefined) {
    leftBound = dayjs.utc().hour(0).minute(0).second(0).millisecond(0);
    rightBound = leftBound.add(1, 'day');
    submissionHour = dayjs.utc().hour();
  } else {
    // For tests. Note that both mockDate and mockHour should be passed in.
    leftBound = dayjs.utc(mockDate, 'YYYYMMDD').hour(0).minute(0).second(0);
    rightBound = leftBound.add(1, 'day');
    submissionHour = mockHour;
  }

  const submissionDate = dayjs.utc(resp, 'YYYYMMDD').hour(submissionHour);
  //  console.log(`Submission hour: ${submissionHour}`);
  //  console.log(`Submission date: ${submissionDate}`);
  //  console.log(`Left bound: ${leftBound}`);
  //  console.log(`Right bound: ${rightBound}`);
  return submissionDate.isBetween(leftBound, rightBound, 'millisecond', '[)');
}

module.exports = isValidLCDate;
