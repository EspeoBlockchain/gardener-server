import InvalidRequestError from './InvalidRequestError';
import { INVALID_SELECTOR_DATA } from './ErrorCode';

class InvalidSelectorDataError extends InvalidRequestError {
  constructor(message) {
    super(message, INVALID_SELECTOR_DATA);
  }
}

export default InvalidSelectorDataError;
