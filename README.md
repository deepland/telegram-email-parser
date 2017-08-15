## Description

Get all emails from webpage using telegram bot.

#### Commands:

/start, /help  
/url <url>

Example: `/url https://example.org`

## Requirements

Node v7.6.0+ with async/await support.

## Install and usage

##### Install:

```sh
git clone https://github.com/Bannerets/telegram-email-parser telegram-email-parser
cd telegram-email-parser
npm install
```

Set your telegram bot token in settings.json.

###### settings.json example:
```json
{
  "token": "296215141:ABHbxSGSASSlGbgtjp4Cwutssezznp8cf9T"
}
```

##### Run:

```sh
node index.js
```
