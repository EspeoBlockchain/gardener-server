import {LoggerPort} from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import InvalidContentTypeError from '@core/domain/common/utils/error/InvalidContentTypeError';
import RandomRequestExecutor from '@core/domain/request/requestExecutor/RandomRequestExecutor';
import UrlRequestExecutor from './UrlRequestExecutor';

class RequestExecutorFactory  {
    private requestExecutors: RequestExecutor[];
    constructor(
        sgxEnabled: boolean,
        randomDotOrgApiKey: string,
        selectDataUseCase: SelectDataUseCase,
        logger: LoggerPort,
    ) {
        this.requestExecutors = [
            new UrlRequestExecutor(selectDataUseCase, logger),
            new RandomRequestExecutor(sgxEnabled, randomDotOrgApiKey, logger),
        ];
    }

    create(contentType: string): RequestExecutor {
        let chosenRequestExecutor = null;
        this.requestExecutors.forEach( (requestExecutor) => {
            if (requestExecutor.canHandle(contentType)) {
                chosenRequestExecutor = requestExecutor;
            }
        });

        if (chosenRequestExecutor == null) {
            throw new InvalidContentTypeError(`${contentType} is not a valid content type`);
        }

        return chosenRequestExecutor;
    }
}

export default RequestExecutorFactory;
