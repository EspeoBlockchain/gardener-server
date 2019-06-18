const InvalidRequestError = require('./InvalidRequestError');
const { INVALID_SELECTOR_DATA } = require('./ErrorCode');

class InvalidSelectorDataError extends InvalidRequestError {
  constructor(message) {
    super(message, INVALID_SELECTOR_DATA);
  }
}

module.exports = InvalidSelectorDataError;
