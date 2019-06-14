const InvalidRequestError = require('./InvalidRequestError');
const { NO_MATCHING_ELEMENTS_FOUND } = require('./ErrorCode');

class NoMatchingElementsFoundError extends InvalidRequestError {
  constructor(message) {
    super(message, NO_MATCHING_ELEMENTS_FOUND);
  }
}

module.exports = NoMatchingElementsFoundError;
