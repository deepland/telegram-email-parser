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

function showHelp (msg) {
  const str = 'Commands:\n/url <url>';
  bot.sendMessage(msg.chat.id, str);
}
