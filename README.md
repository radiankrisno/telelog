# Telelog
Lightweight [telegram](https://telegram.org/) logger built in [Node.js](https://nodejs.org/en/)

## Features
- Send logs from your app to telegram through telegram bot in real-time
- 4 levels of logs based on needs

## Installing
`$ npm install telelog`
- Depends on `axios`
- Built with JavaScript

## Requirements
1. [Create a telegram bot](https://core.telegram.org/bots) and copy its `BOT_TOKEN_ID`
2. Add the bot to a group
3. Get group's `CHAT_ID` by going to https://web.telegram.org and open a group chat. Look at the URL and get the digits behind the character `#`
4. You can also use [IDBot](https://t.me/myidbot) to get `CHAT_ID`

## Usages
```javascript
// Import the library
import Telelog from 'telelog';

// Initialize the telelog class
const telelog = new Telelog(BOT_TOKEN_ID, CHAT_ID);

// Log some info
telelog.info('Pshhh, this is a secret!');
/*
INFO [DATE] [FILE_LINE]

 Pshhh, this is a secret!
*/

// Debug
const a = 8;
telelog.info('Is this thing working? Let me see, the value of a is:', a);
/*
DEBUG [DATE] [FILE_LINE] 

 Is this thing working? Let me see, the value of a is: 8
*/

// Warn
telelog.warn('Be careful!', 'This is dangerous!');
/*
WARN [DATE] [FILE_LINE]

 Be careful! This is dangerous!
*/

// Error
telelog.error('Beep Boop! There is an error. @randomuser');
/*
ERROR [DATE] [FILE_LINE]

 Beep Boop! There is an error.
*/
```

- Mentioning is possible by using @ followed by the telegram handle
- [DATE] will be replaced by the date when the log is produced
- [FILE_LINE] will be replaced by the file name and line which produces the log

## License
[MIT](https://github.com/radiankrisno/telelog/blob/master/LICENSE)