import RequestExecutor from '../../../domain/common/port/RequestExecutorPort';
import InvalidContentTypeError from '../../../domain/common/utils/error/InvalidContentTypeError';
import UrlRequestExecutor from './UrlRequestExecutor';

class RequestExecutorFactory  {
    create(contentType: string): RequestExecutor {
        switch (contentType) {
            case 'json':
            case 'xml':
            case 'html':
            case 'ipfs':
                return new UrlRequestExecutor();
            default:
                throw new InvalidContentTypeError(`${contentType} is not a valid content type`);
        }
    }
}

export default RequestExecutorFactory;
