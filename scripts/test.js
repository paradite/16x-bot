const axios = require('axios');
const termsUrl = 'https://paradite.github.io/16x-bot/terms.json';

axios.get(termsUrl).then((response) => {
  console.log(response.data);
});
