const requestp = require('request-promise-native');
const TelegramBot = require('node-telegram-bot-api');

const settings = require('./settings.json');

const bot = new TelegramBot(settings.token, {polling: true});

bot.on('polling_error', (error) => {
  console.log('' + error);
  if (error.response.body.error_code === 401) process.exit(1);
});

bot.onText(/\/start/, showHelp);
bot.onText(/\/help/, showHelp);

bot.onText(/\/url (.*)/, async (msg, match) => {
  const document = await get(match[1], msg.chat.id);
  if (!document) return;

  const emails = parse(document);

  let str = '';

  if (emails.length) {
    for (var email of emails) {
      str += email + '\n';
    }

  } else str = 'No emails.';

  bot.sendMessage(msg.chat.id, str);
});

function parse (str) {
  let emails = [];
  let regexp = /[\w\.]+@\w+\.[A-Za-z]+/g;

  while (result = regexp.exec(str)) {
    emails.push(result[0]);
  }

  return emails;
}

async function get (url, id) {
  try {
    return await requestp(url);
  } catch (e) {
    bot.sendMessage(id, `${url}: ${e}`);
  }
}

function showHelp (msg) {
  let str = 'Commands:\n' +
  '/url <url>  URL with http:// or https://';
  bot.sendMessage(msg.chat.id, str);
}
