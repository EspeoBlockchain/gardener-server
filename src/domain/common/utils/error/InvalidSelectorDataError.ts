import { ErrorCode } from './ErrorCode';
import InvalidRequestError from './InvalidRequestError';

class InvalidSelectorDataError extends InvalidRequestError {
  constructor(message) {
    super(message, ErrorCode.INVALID_SELECTOR_DATA);
  }
}

export default InvalidSelectorDataError;
