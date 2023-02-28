const axios = require('axios');

async function getLanguageResponse(query) {
  console.log('Sending to Din Language Detection:');
  console.log(query);
  const languageDetectionUrl =
    'https://language-detection-zd63nwo7na-as.a.run.app';
  const languageDetectionToken = process.env.DIN_TOKEN;
  try {
    const response = await axios.post(
      languageDetectionUrl,
      {
        message: query,
        key: languageDetectionToken,
      },
      {
        headers: {},
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.log('language detection model error');
    console.log(error);
    return undefined;
  }
}

async function testLanguage() {
  const response = await getLanguageResponse('sibay shiok');
  console.log('Response from Din Language Detection:');
  console.log(response);
}

testLanguage();
