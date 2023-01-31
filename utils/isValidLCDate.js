const dayjs = require('dayjs');
let isBetween = require('dayjs/plugin/isBetween');
let utc = require('dayjs/plugin/utc');
dayjs.extend(isBetween);
dayjs.extend(utc);

function isValidLCDate(
  submittedDateString,
  mockServerDateString,
  mockServerHourString
) {
  let submissionHour, leftBound, rightBound;
  if (mockServerDateString == undefined && mockServerHourString == undefined) {
    // Use actual server date and hour
    leftBound = dayjs.utc().hour(0).minute(0).second(0).millisecond(0);
    rightBound = leftBound.add(1, 'day');
    submissionHour = dayjs.utc().hour();
  } else {
    // For tests where we want to mock the server time. Note that both mockServerDateString and mockServerHourString should be passed in.
    leftBound = dayjs
      .utc(mockServerDateString, 'YYYYMMDD')
      .hour(0)
      .minute(0)
      .second(0);
    rightBound = leftBound.add(1, 'day');
    submissionHour = mockServerHourString;
  }

  const submissionDate = dayjs
    .utc(submittedDateString, 'YYYYMMDD')
    .hour(submissionHour);
  //  console.log(`Submission hour: ${submissionHour}`);
  //  console.log(`Submission date: ${submissionDate}`);
  //  console.log(`Left bound: ${leftBound}`);
  //  console.log(`Right bound: ${rightBound}`);
  return submissionDate.isBetween(leftBound, rightBound, 'millisecond', '[)');
}

module.exports = isValidLCDate;
