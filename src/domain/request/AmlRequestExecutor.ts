import AxiosAmlDataFetcherAdapter from '@core/application/dataFetcher/AxiosAmlDataFetcherAdapter';
import JsonSelector from '@core/application/selector/json/JsonSelectorAdapter';
import DataSelectorFinder from '@core/domain/common/DataSelectorFinder';
import {LoggerPort} from '@core/domain/common/port';
import RequestExecutor from '@core/domain/common/port/RequestExecutorPort';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import Request from '@core/domain/request/Request';
import Response from '@core/domain/response/Response';

class AmlRequestExecutor implements RequestExecutor {
  private fetchDataUseCase: FetchDataUseCase;
  private selectDataUseCase: SelectDataUseCase;

  constructor(
      bearerToken: string,
      amlBaseUrl: string,
      private readonly logger: LoggerPort,
  ) {
    this.fetchDataUseCase = new FetchDataUseCase(new AxiosAmlDataFetcherAdapter(bearerToken, amlBaseUrl), this.logger);
    this.selectDataUseCase = new SelectDataUseCase(
        new DataSelectorFinder([new JsonSelector()]),
        logger,
    );
  }

  canHandle(contentType: string): boolean {
    return ['aml'].includes(contentType);
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

export default AmlRequestExecutor;
