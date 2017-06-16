const requestp = require('request-promise-native');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TOKEN, {
  webHook: {
    port: process.env.PORT
  }
});

// HEROKU_URL example: https://<app-name>.herokuapp.com:443
bot.setWebHook(`${process.env.HEROKU_URL}/bot${bot.token}`);

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
