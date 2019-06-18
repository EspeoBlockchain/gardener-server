import InvalidRequestError from './InvalidRequestError';
import { ErrorCode } from './ErrorCode';

class NoMatchingElementsFoundError extends InvalidRequestError {
  constructor(message) {
    super(message, ErrorCode.NO_MATCHING_ELEMENTS_FOUND);
  }
}

export default NoMatchingElementsFoundError;
