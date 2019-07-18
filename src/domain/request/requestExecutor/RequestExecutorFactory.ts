import {LoggerPort} from '@core/domain/common/port';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import RequestExecutor from '../../../domain/common/port/RequestExecutorPort';
import InvalidContentTypeError from '../../../domain/common/utils/error/InvalidContentTypeError';
import UrlRequestExecutor from './UrlRequestExecutor';

class RequestExecutorFactory  {
    constructor(
        private readonly fetchDataUseCase: FetchDataUseCase,
        private readonly selectDataUseCase: SelectDataUseCase,
        private readonly logger: LoggerPort,
    ) {
    }

    create(contentType: string): RequestExecutor {
        switch (contentType) {
            case 'json':
            case 'xml':
            case 'html':
            case 'ipfs':
                return new UrlRequestExecutor(this.fetchDataUseCase, this.selectDataUseCase, this.logger);
            default:
                throw new InvalidContentTypeError(`${contentType} is not a valid content type`);
        }
    }
}

export default RequestExecutorFactory;
