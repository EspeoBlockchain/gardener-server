import RandomDotOrgDataFetcher from '@core/application/dataFetcher/random/RandomDotOrgDataFetcherAdapter';
import RandomSgxDataFetcher from '@core/application/dataFetcher/random/RandomSgxDataFetcherAdapter';
import {LoggerPort} from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import Request from '@core/domain/request/Request';
import Response from '@core/domain/response/Response';

class RandomRequestExecutor implements RequestExecutor {
    private fetchDataUseCase: FetchDataUseCase;
    constructor(
        private readonly sgxEnabled: boolean,
        private readonly randomDotOrgApiKey: string,
        private readonly logger: LoggerPort,
    ) {
        this.fetchDataUseCase = new FetchDataUseCase(this.chooseDataFetcher(), this.logger);
    }

    canHandle(contentType: string): boolean {
        return 'random' === contentType;
    }

    async execute(request: Request): Promise<Response> {
        const response = new Response(request.id);

        const fetchedData = await this.fetchDataUseCase.fetchData(request);
        response.addFetchedData(fetchedData);
        response.addSelectedData(fetchedData);

        this.logger.info(`Fetched data [response=${JSON.stringify(response)}]`);

        return response;
    }

    private chooseDataFetcher() {
        if (this.sgxEnabled) {
            return new RandomSgxDataFetcher();
        } else {
            return new RandomDotOrgDataFetcher(this.randomDotOrgApiKey);
        }
    }
}

export default RandomRequestExecutor;
