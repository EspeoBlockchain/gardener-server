const { INVALID_URL } = require('./ErrorCode');

class InvalidUrlError extends Error {
  constructor(message) {
    super(message);
    this.code = INVALID_URL;
  }
}

module.exports = InvalidUrlError;
