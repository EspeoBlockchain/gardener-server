import InvalidContentTypeError from '@core/domain/common/utils/error/InvalidContentTypeError';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
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
