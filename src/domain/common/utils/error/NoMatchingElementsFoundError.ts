import InvalidRequestError from './InvalidRequestError';
import { NO_MATCHING_ELEMENTS_FOUND } from './ErrorCode';

class NoMatchingElementsFoundError extends InvalidRequestError {
  constructor(message) {
    super(message, NO_MATCHING_ELEMENTS_FOUND);
  }
}

export default NoMatchingElementsFoundError;
