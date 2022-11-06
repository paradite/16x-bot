const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const definitionMap = {
  rsu: [
    'Restricted Stock Unit',
    'https://www.investopedia.com/terms/r/restricted-stock-unit.asp',
  ],
  lc: [
    'LC is an acronym for LeetCode, an online judge (OJ) for practicing coding problems and prepare for technical interviews.',
    'https://leetcode.com/',
  ],
  tc: [
    'TC refers to the total compensation of a job in a year. Total compensation in a tech company typically consists of 3 components: base salary, bonus and stock (or RSU / stock options).',
  ],
  ic: [
    'IC is an acronym for individual contributor. Individual contributor is one of the two tracks for software engineering career, the other being the management track.',
  ],
  lgtm: [
    'The letters LGTM stand for "looks good to me." Those working in software development often use it after reviewing code.',
  ],
  pr: [
    "PR/MR means pull request or merge request. They tell others about changes you've pushed to a branch in a repository. They are essentially a request to merge one branch into another.",
  ],
  mr: [
    "PR/MR means pull request or merge request. They tell others about changes you've pushed to a branch in a repository. They are essentially a request to merge one branch into another.",
  ],
  swe: [
    'SWE is an acronym for software engineer, a profession where people code and write software.',
  ],
  em: [
    'EM is an acronym for engineering manager. Engineering manager (management) is one of the two tracks for software engineering career, the other being the individual contributor track.',
  ],
  pip: [
    'In tech companies, PIP means performance improvement plan. The PIP program is for people whose performance did not meet expectations in a review cycle. If PIP goals are not met at the end of the program, the employee will usually be let go.',
  ],
};

/**
 * Get name from the msg for addressing the user in reply
 *
 * @param {msTelegramBot.Messageg} msg
 */
function getNameForReply(msg) {
  let namePart = 'Anonymous user';
  if (msg.from.username) {
    namePart = `@${msg.from.username}`;
  } else if (msg.from.first_name) {
    namePart = msg.from.first_name;
  }
  return namePart;
}

// Matches "/define [whatever]"
// term definition
// bot.onText(/\/define (.+)/, (msg, match) => {
bot.onText(/!bot (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const messageId = msg.message_id;
  const chatId = msg.chat.id;
  const namePart = getNameForReply(msg);
  const resp = match[1]; // the captured "whatever"

  console.log(`Received: ${resp}`);

  let reply = `Hi ${namePart}. I have not learnt about ${resp} yet. Open a PR to add it. Link in bot bio.`;
  if (definitionMap[resp.toLowerCase()]) {
    const [description, link] = definitionMap[resp.toLowerCase()];
    if (link) {
      reply = `${description}\nRead more: ${link}`;
    } else {
      reply = `${description}`;
    }
  }

  console.log(`Reply: ${reply}`);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, reply, {
    reply_to_message_id: messageId,
  });
});

// Chinese detection
// bot.onText(/\/define (.+)/, (msg, match) => {
bot.onText(
  /([\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f])/,
  (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
    const messageId = msg.message_id;
    const chatId = msg.chat.id;
    const namePart = getNameForReply(msg);
    const resp = match[1]; // the captured "whatever"

    console.log(`Received: ${resp}`);

    const reply = `Hi, ${namePart}. This is a gentle reminder to use English in this group so that everyone can understand. 😊`;

    console.log(`Reply: ${reply}`);
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, reply, {
      reply_to_message_id: messageId,
    });
  }
);

// motivational reply to encourage ppl to carry on joining the LC party
bot.on('message', async (msg) => {
  // console.log(msg)
  const messageId = msg.message_id;
  if (msg.photo && msg.caption) {
    const match = msg.caption.match(/#LC(20\d{2})(\d{2})(\d{2})/g);
    const resp = match[0].substring(3, 11); // find the YYYYMMDD
    console.log(`Received YYYYMMDD: ${resp}`);
    const chatId = msg.chat.id;
    const namePart = getNameForReply(msg);

    let reply = `Sorry ${namePart}, I have not learnt about ${match[0]} format yet.`;
    if (
      !(resp.substring(4, 6) <= 12) ||
      !(resp.substring(6, 8) <= 31) ||
      !(resp.substring(0, 4) >= 2022)
    ) {
      bot.sendMessage(chatId, reply);
      return;
    }
    const submitDate = new Date(
      resp.substring(0, 4),
      resp.substring(4, 6) - 1,
      resp.substring(6, 8)
    );
    if (!isNaN(submitDate)) {
      const response = await axios.get(`https://api.github.com/zen`);
      reply = `Good job doing ${submitDate.toLocaleDateString(
        'en-US'
      )} LC question! 🚀 ${namePart}\r\n${response.data}`;
    }
    bot.sendMessage(chatId, reply, {
      reply_to_message_id: messageId,
    });
  }
});

console.log('Bot started');
