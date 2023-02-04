const dayjs = require('dayjs');
let isBetween = require('dayjs/plugin/isBetween');
let utc = require('dayjs/plugin/utc');
dayjs.extend(isBetween);
dayjs.extend(utc);

function isValidLCDate(submittedDateString, mockServerDate) {
  let leftBound, rightBound;
  if (mockServerDate == undefined) {
    // Use actual server date and hour
    leftBound = dayjs.utc().hour(0).minute(0).second(0).millisecond(0);
    rightBound = leftBound.add(1, 'day');
  } else {
    // For tests where we want to mock the server time.
    leftBound = dayjs
      .utc(mockServerDate, 'YYYYMMDD')
      .hour(0)
      .minute(0)
      .second(0);
    rightBound = leftBound.add(1, 'day');
  }

  const submissionDate = dayjs.utc(submittedDateString, 'YYYYMMDD');
  //  console.log(`Submission date: ${submissionDate}`);
  //  console.log(`Left bound: ${leftBound}`);
  //  console.log(`Right bound: ${rightBound}`);
  return submissionDate.isBetween(leftBound, rightBound, 'millisecond', '[)');
}

module.exports = isValidLCDate;
