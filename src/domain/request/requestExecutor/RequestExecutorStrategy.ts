import { LoggerPort } from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import InvalidContentTypeError from '@core/domain/common/utils/error/InvalidContentTypeError';
import UrlRequestExecutor from './UrlRequestExecutor';

class RequestExecutorStrategy  {
    private requestExecutors: RequestExecutor[];

    constructor(
        fetchDataUseCase: FetchDataUseCase,
        selectDataUseCase: SelectDataUseCase,
        logger: LoggerPort,
    ) {
        this.requestExecutors = [new UrlRequestExecutor(fetchDataUseCase, selectDataUseCase, logger)];
    }

    create(contentType: string): RequestExecutor {
        const chosenRequestExecutor = this.requestExecutors.find(re => re.canHandle(contentType));

        if (chosenRequestExecutor === undefined) {
            throw new InvalidContentTypeError(`${contentType} is not a valid content type`);
        }

        return chosenRequestExecutor;
    }
}

export default RequestExecutorStrategy;
