import { ErrorCode } from './ErrorCode';
import InvalidRequestError from './InvalidRequestError';

class InvalidEncryptionError extends InvalidRequestError {
  constructor(message: string) {
    super(message, ErrorCode.INVALID_ENCRYPTION);
  }
}

export default InvalidEncryptionError;
