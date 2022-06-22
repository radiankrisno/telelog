const axios = require('axios');
const path = require('path');

class Telelog {
  name = this.constructor.name;

  botTokenId = null;

  chatId = null;

  url = 'https://api.telegram.org/bot';

  type = {
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    WARN: 'WARN',
    ERROR: 'ERROR',
  };

  constructor(botTokenId, chatId) {
    this.initialize(botTokenId, chatId);
  }

  async initialize(botTokenId, chatId) {
    try {
      this.botTokenId = botTokenId;
      this.chatId = chatId;
      this.url += this.botTokenId;
      await axios.get(`${this.url}/getMe`);
      await axios.post(`${this.url}/getChat?${new URLSearchParams({ chat_id: this.chatId })}`);
    } catch (err) {
      throw new Error(`Bot token Id: ${this.botTokenId} or chat Id: ${this.chatId} is not valid`);
    }
  }

  static getLogFileAndLine() {
    const { stack } = new Error('');
    const stackArray = stack.split('\n');
    const stackMessage = stackArray[3];
    const caller = stackMessage.match(/\(.*\)/)[0];
    const logFileAndLine = caller.substring(caller.lastIndexOf(path.sep) + 1, caller.length - 1);
    return logFileAndLine;
  }

  createParams(message) {
    const params = {
      chat_id: this.chatId,
      text: message,
      parse_mode: 'HTML',
    };
    return params;
  }

  async sendMessage(message) {
    const params = this.createParams(message);
    await axios.post(`${this.url}/sendMessage?${new URLSearchParams(params)}`);
  }

  processor(type, logFileAndLine, args) {
    const message = `<b>${type}</b> ${new Date(Date.now()).toLocaleDateString()} ${logFileAndLine} \n\n ${args.join(' ')}`;
    this.sendMessage(message);
  }

  info(...args) {
    this.processor(this.type.INFO, Telelog.getLogFileAndLine(), args);
  }

  debug(...args) {
    this.processor(this.type.DEBUG, Telelog.getLogFileAndLine(), args);
  }

  warn(...args) {
    this.processor(this.type.WARN, Telelog.getLogFileAndLine(), args);
  }

  error(...args) {
    this.processor(this.type.ERROR, Telelog.getLogFileAndLine(), args);
  }
}

module.exports = Telelog;
