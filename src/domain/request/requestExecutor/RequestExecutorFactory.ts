import {LoggerPort} from '@core/domain/common/port';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import RequestExecutor from '../../../domain/common/port/RequestExecutorPort';
import InvalidContentTypeError from '../../../domain/common/utils/error/InvalidContentTypeError';
import UrlRequestExecutor from './UrlRequestExecutor';

class RequestExecutorFactory  {
    private requestExecutors: RequestExecutor[];
    constructor(
        fetchDataUseCase: FetchDataUseCase,
        selectDataUseCase: SelectDataUseCase,
        logger: LoggerPort,
    ) {
        this.requestExecutors = [new UrlRequestExecutor(fetchDataUseCase, selectDataUseCase, logger)];
    }

    create(contentType: string): RequestExecutor {
        let chosenRequestExecutor = null;

        this.requestExecutors.forEach( (requestExecutor) => {
            if (requestExecutor.canHandle(contentType)) {
                chosenRequestExecutor = requestExecutor;
            }
        });

        if (chosenRequestExecutor === null) {
            throw new InvalidContentTypeError(`${contentType} is not a valid content type`);
        }

        return chosenRequestExecutor;
    }
}

export default RequestExecutorFactory;
