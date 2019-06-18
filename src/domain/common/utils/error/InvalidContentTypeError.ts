import InvalidRequestError from './InvalidRequestError';
import { ErrorCode } from './ErrorCode';

class InvalidContentTypeError extends InvalidRequestError {
  constructor(message) {
    super(message, ErrorCode.INVALID_CONTENT_TYPE);
  }
}

export default InvalidContentTypeError;
