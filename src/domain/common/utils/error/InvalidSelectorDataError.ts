import InvalidRequestError from './InvalidRequestError';
import { ErrorCode } from './ErrorCode';

class InvalidSelectorDataError extends InvalidRequestError {
  constructor(message) {
    super(message, ErrorCode.INVALID_SELECTOR_DATA);
  }
}

export default InvalidSelectorDataError;
