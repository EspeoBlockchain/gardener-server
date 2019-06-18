import InvalidRequestError from './InvalidRequestError';
import { ErrorCode } from './ErrorCode';

class InvalidUrlError extends InvalidRequestError {
  constructor(message) {
    super(message, ErrorCode.INVALID_URL);
  }
}

export default InvalidUrlError;
