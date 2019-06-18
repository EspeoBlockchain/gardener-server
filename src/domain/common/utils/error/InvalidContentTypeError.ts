import InvalidRequestError from './InvalidRequestError';
import { INVALID_CONTENT_TYPE } from './ErrorCode';

class InvalidContentTypeError extends InvalidRequestError {
  constructor(message) {
    super(message, INVALID_CONTENT_TYPE);
  }
}

export default InvalidContentTypeError;
