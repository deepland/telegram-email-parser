const fs = require('fs');

const str = `{
  "token": "YOUR_TELEGRAM_BOT_TOKEN"
}`;

try {
  fs.readFileSync('settings.json');
} catch (e) {
  fs.writeFileSync('settings.json', str);
}
