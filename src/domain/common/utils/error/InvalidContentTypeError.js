const { INVALID_CONTENT_TYPE } = require('./ErrorCode');

class InvalidContentTypeError extends Error {
  constructor(message) {
    super(message);
    this.code = INVALID_CONTENT_TYPE;
  }
}

module.exports = InvalidContentTypeError;
