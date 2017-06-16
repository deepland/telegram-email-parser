const requestp = require('request-promise-native');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(settings.token, {polling: true});
