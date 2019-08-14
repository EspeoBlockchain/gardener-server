import UrlDataFetcher from '@core/application/dataFetcher/AxiosUrlDataFetcherAdapter';
import IdentitySelector from '@core/application/selector/identity/IdentitySelectorAdapter';
import JsonSelector from '@core/application/selector/json/JsonSelectorAdapter';
import XmlSelector from '@core/application/selector/xml/XmlSelectorAdapter';
import DataSelectorFinder from '@core/domain/common/DataSelectorFinder';
import {LoggerPort} from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import DecryptUrlUseCase from '@core/domain/common/usecase/DecryptUrlUseCase';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import Request from '@core/domain/request/Request';
import Response from '@core/domain/response/Response';

class UrlRequestExecutor implements RequestExecutor {
    private fetchDataUseCase: FetchDataUseCase;
    private selectDataUseCase: SelectDataUseCase;
    private decryptUrlUseCase: DecryptUrlUseCase;
    constructor(
        privateKey: string,
        private readonly logger: LoggerPort,
    ) {
        this.fetchDataUseCase = new FetchDataUseCase(new UrlDataFetcher(), this.logger);
        this.selectDataUseCase = new SelectDataUseCase(
            new DataSelectorFinder([new JsonSelector(), new XmlSelector(), new IdentitySelector()]),
            logger,
        );
        this.decryptUrlUseCase = new DecryptUrlUseCase(privateKey);
    }

    canHandle(contentType: string): boolean {
        return ['json', 'xml', 'html', 'ipfs'].includes(contentType);
    }

    async execute(request: Request): Promise<Response> {
        const response = new Response(request.id);
        request.url = await this.decryptUrlUseCase.decrypt(request.url);

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
