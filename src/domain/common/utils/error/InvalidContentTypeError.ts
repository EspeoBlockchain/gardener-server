const InvalidRequestError = require('./InvalidRequestError');
const { INVALID_CONTENT_TYPE } = require('./ErrorCode');

class InvalidContentTypeError extends InvalidRequestError {
  constructor(message) {
    super(message, INVALID_CONTENT_TYPE);
  }
}

module.exports = InvalidContentTypeError;
