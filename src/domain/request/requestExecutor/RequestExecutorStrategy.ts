import { LoggerPort } from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import InvalidContentTypeError from '@core/domain/common/utils/error/InvalidContentTypeError';
import RandomRequestExecutor from '@core/domain/request/requestExecutor/RandomRequestExecutor';
import UrlRequestExecutor from './UrlRequestExecutor';

class RequestExecutorStrategy  {
    private requestExecutors: RequestExecutor[];

    constructor(
        sgxEnabled: boolean,
        randomDotOrgApiKey: string,
        logger: LoggerPort,
    ) {
        this.requestExecutors = [
            new UrlRequestExecutor(logger),
            new RandomRequestExecutor(sgxEnabled, randomDotOrgApiKey, logger),
        ];
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
