import UrlDataFetcher from '@core/application/dataFetcher/AxiosUrlDataFetcherAdapter';
import {LoggerPort} from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import Request from '@core/domain/request/Request';
import Response from '@core/domain/response/Response';

class UrlRequestExecutor implements RequestExecutor {
    private fetchDataUseCase: FetchDataUseCase;
    constructor(
        private readonly selectDataUseCase: SelectDataUseCase,
        private readonly logger: LoggerPort,
    ) {
        this.fetchDataUseCase = new FetchDataUseCase(new UrlDataFetcher(), this.logger);
    }

    canHandle(contentType: string): boolean {
        return ['json', 'xml', 'html', 'ipfs'].includes(contentType);
    }

    async execute(request: Request): Promise<Response> {
        const response = new Response(request.id);

        const fetchedData = await this.fetchDataUseCase.fetchData(request);
        response.addFetchedData(fetchedData);

        const selectedData = await this.selectDataUseCase.selectFromRawData(
            response.fetchedData,
            request.getContentType(),
            request.getSelectionPath(),
        );
        response.addSelectedData(selectedData);
        this.logger.info(`Fetched and selected data [response=${JSON.stringify(response)}]`);

        return response;
    }
}

export default UrlRequestExecutor;
