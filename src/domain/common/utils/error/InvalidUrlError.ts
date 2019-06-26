import { ErrorCode } from './ErrorCode';
import InvalidRequestError from './InvalidRequestError';

class InvalidUrlError extends InvalidRequestError {
  constructor(message: string) {
    super(message, ErrorCode.INVALID_URL);
  }
}

export default InvalidUrlError;
