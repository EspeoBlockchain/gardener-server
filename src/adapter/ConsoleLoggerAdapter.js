/* eslint-disable no-console, class-methods-use-this */

const LoggerPort = require('../domain/common/port/LoggerPort');

class ConsoleLoggerAdapter extends LoggerPort {
  info(message) {
    console.log(message);
  }
}

module.exports = ConsoleLoggerAdapter;
