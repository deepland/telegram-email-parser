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
  const document = await get(match[0]);
  const emails = parse(document);

  let str = '';

  for (var email of emails) {
    str += email + '\n';
  }

  bot.sendMessage(msg.chat.id, str);
});

function parse (str) {
  let emails = [];
  let regexp = /[\w\.]+@\w+\.[A-Za-z]+/g;

  while (result = regexp.exec(str)) {
    emails.push(result);
  }
}

function get (url) {
  try {
    return requestp(url);
  } catch (e) {
    console.log(`${url}: ${e}`);
  }
}

function showHelp (msg) {
  const str = 'Commands:\n/url <url>';
  bot.sendMessage(msg.chat.id, str);
}
