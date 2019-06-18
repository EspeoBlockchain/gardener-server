import InvalidRequestError from './InvalidRequestError';
import { INVALID_URL } from './ErrorCode';

class InvalidUrlError extends InvalidRequestError {
  constructor(message) {
    super(message, INVALID_URL);
  }
}

export default InvalidUrlError;
