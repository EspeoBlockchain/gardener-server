/* eslint-disable no-console */

const LoggerPort = require('../../domain/common/port/LoggerPort');

class ConsoleLoggerAdapter extends LoggerPort {
  info(message) {
    console.log(message);
  }

  error(message, error) {
    console.error(message, error);
  }
}

module.exports = ConsoleLoggerAdapter;
