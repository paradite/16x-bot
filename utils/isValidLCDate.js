const dayjs = require('dayjs');
let isBetween = require('dayjs/plugin/isBetween');
let utc = require('dayjs/plugin/utc');
dayjs.extend(isBetween);
dayjs.extend(utc);

function isValidLCDate(...args) {
  let submissionHour, leftBound, rightBound;
  const resp = args[0];
  if (args.length > 1) {
    leftBound = dayjs.utc(args[1], 'YYYYMMDD').hour(0).minute(0).second(0);
    rightBound = leftBound.add(1, 'day');
    submissionHour = args[2];
  } else {
    leftBound = dayjs.utc().hour(0).minute(0).second(0).millisecond(0);
    rightBound = leftBound.add(1, 'day');
    submissionHour = dayjs.utc().hour();
  }

  const submissionDate = dayjs.utc(resp, 'YYYYMMDD').hour(submissionHour);
  //  console.log(`Submission hour: ${submissionHour}`);
  //  console.log(`Submission date: ${submissionDate}`);
  //  console.log(`Left bound: ${leftBound}`);
  //  console.log(`Right bound: ${rightBound}`);
  return submissionDate.isBetween(leftBound, rightBound, 'millisecond', '[)');
}

module.exports = isValidLCDate;
