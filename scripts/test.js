const axios = require('axios');
const termsUrl = 'https://paradite.github.io/16x-bot/terms.json';

axios.get(termsUrl).then((response) => {
  console.log(response.data);
});

const dingBotUrl =
  'https://asia-southeast1-free-jobs-253208.cloudfunctions.net/din';

const dingToken = process.env.DING_TOKEN;

axios
  .post(
    dingBotUrl,
    {
      message: 'How much does Din make?',
      key: dingToken,
    },
    {
      headers: {},
    }
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
