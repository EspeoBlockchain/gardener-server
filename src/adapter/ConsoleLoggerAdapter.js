/* eslint-disable no-console */

const LoggerPort = require('../domain/common/port/LoggerPort');

class ConsoleLoggerAdapter extends LoggerPort {
  info(message) {
    console.log(message);
  }

  error(message) {
    console.error(message);
  }
}

module.exports = ConsoleLoggerAdapter;
