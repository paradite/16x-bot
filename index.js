const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { Client } = require('pg');
const dayjs = require('dayjs');
let isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
const client = new Client();

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack));

// Initialize dictionary from remote json

let definitionMap = {};
const termsUrl = 'https://paradite.github.io/16x-bot/terms.json';

axios
  .get(termsUrl)
  .then((response) => {
    console.log(
      'got remote dictionary of size',
      Object.keys(response.data).length
    );
    definitionMap = response.data;
  })
  .catch((error) => {
    console.error('init dictionary fail');
    console.error(error);
  });

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

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

async function getDinBotResponse(query) {
  const dingBotUrl =
    'https://asia-southeast1-free-jobs-253208.cloudfunctions.net/din';

  const dingToken = process.env.DING_TOKEN;

  try {
    const response = await axios.post(
      dingBotUrl,
      {
        message: query,
        key: dingToken,
      },
      {
        headers: {},
      }
    );

    const data = response.data;

    // validate data
    if (!data || data.length > 500) {
      console.log('response invalid');
      console.log(data);
      return undefined;
    }
    return data;
  } catch (error) {
    console.log('Din bot error');
    console.log(error);
    return undefined;
  }
}

// Matches "/define [whatever]"
// term definition
// bot.onText(/\/define (.+)/, (msg, match) => {
bot.onText(/!bot (.+)/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const messageId = msg.message_id;
  const chatId = msg.chat.id;
  const namePart = getNameForReply(msg);
  const resp = match[1]; // the captured "whatever"

  console.log(`Received: ${resp}`);

  let reply = `Hi ${namePart}. I have not learnt about ${resp} yet.\r\nOpen a PR [here](https://github.com/paradite/16x-bot) to add it.`;
  if (definitionMap[resp.toLowerCase()]) {
    const [description, link] = definitionMap[resp.toLowerCase()];
    if (link) {
      reply = `${description}\r\nRead more [here](${link}).`;
    } else {
      reply = `${description}`;
    }
  }

  // redirect to Din bot
  const dinBotResponseText = await getDinBotResponse(resp);
  if (dinBotResponseText) {
    reply = `(Redirecting to Din bot...)\r\n${dinBotResponseText}`;
  }

  console.log(`Reply: ${reply}`);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, reply, {
    reply_to_message_id: messageId,
    disable_web_page_preview: true,
    parse_mode: 'Markdown',
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
    if (!match) {
      return;
    }
    const resp = match[0].substring(3, 11); // find the YYYYMMDD
    console.log(`Received YYYYMMDD: ${resp}`);
    const chatId = msg.chat.id;
    const namePart = getNameForReply(msg);

    let reply = `Sorry ${namePart}, the date you submitted is not valid. Please use current date with format #LCYYYYMMDD. 😊`;

    const submissionDate = dayjs(resp, 'YYYYMMDD');
    console.log('submissionDate', submissionDate);

    if (
      !submissionDate.isBetween(
        dayjs().subtract(2, 'day'),
        dayjs().add(2, 'day')
      )
    ) {
      bot.sendMessage(chatId, reply, {
        reply_to_message_id: messageId,
      });
      return;
    }

    const dateStr = submissionDate.format('DD/MM/YYYY');
    const response = await axios.get(`https://api.github.com/zen`);

    let statsStr = '';
    try {
      const res = await client.query(
        `SELECT COUNT(*) FROM ( SELECT DISTINCT a.username FROM lc_records as a WHERE a.qn_date = $1 and a.username != $2 ) as temp `,
        [dateStr, namePart]
      );
      const existingCount = Number(res.rows[0].count);
      console.log('existingCount', existingCount);
      if (existingCount >= 0) {
        statsStr = `\r\nYou are the ${getCountStr(
          existingCount + 1
        )} person to submit for ${dateStr}.`;
      }

      console.log('dateStr', dateStr);
      console.log('statsStr', statsStr);
      reply = `Good job doing ${dateStr} LC question! 🚀 ${namePart}${statsStr}\r\n${response.data}`;
      bot.sendMessage(chatId, reply, {
        reply_to_message_id: messageId,
      });
    } catch (error) {
      console.error('pg count query fail');
      console.error('send fail');
      console.error(error);
    }

    try {
      console.log('executing query');
      await client.query(
        `INSERT INTO lc_records (username, qn_date, has_image, msg_text, timestamp) VALUES ($1, $2, $3, $4, $5)`,
        [namePart, dateStr, true, msg.caption, new Date()]
      );
      console.log('insert success');
    } catch (error) {
      console.error('pg write fail');
      console.error(error);
    }
  }
});

function getCountStr(count) {
  if (count === 1) {
    return 'first';
  } else if (count === 2) {
    return 'second';
  } else if (count === 3) {
    return 'third';
  } else {
    return `${count}th`;
  }
}

console.log('Bot started');
