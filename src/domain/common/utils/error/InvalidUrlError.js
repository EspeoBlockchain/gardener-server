const InvalidRequestError = require('./InvalidRequestError');
const { INVALID_URL } = require('./ErrorCode');

class InvalidUrlError extends InvalidRequestError {
  constructor(message) {
    super(message, INVALID_URL);
  }
}

module.exports = InvalidUrlError;
