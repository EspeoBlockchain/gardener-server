import { LoggerPort } from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import InvalidContentTypeError from '@core/domain/common/utils/error/InvalidContentTypeError';
import RandomRequestExecutor from '@core/domain/request/requestExecutor/RandomRequestExecutor';
import UrlRequestExecutor from './UrlRequestExecutor';
import AmlRequestExecutor from "@core/domain/request/AmlRequestExecutor";

class RequestExecutorStrategy  {
    private requestExecutors: RequestExecutor[];

    constructor(
        sgxEnabled: boolean,
        randomDotOrgApiKey: string,
        privateKey: string,
        bearerToken: string,
        amlBaseUrl: string,
        logger: LoggerPort,
    ) {
        this.requestExecutors = [
            new UrlRequestExecutor(privateKey, logger),
            new AmlRequestExecutor(bearerToken, amlBaseUrl, logger),
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
