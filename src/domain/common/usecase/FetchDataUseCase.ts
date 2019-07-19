import DataFetcherFactory from '@core/application/dataFetcher/DataFetcherFactory';
import LoggerPort from '@core/domain/common/port/LoggerPort';

class FetchDataUseCase {
  constructor(
    private readonly sgxEnabled: string,
    private readonly randomDotOrgApiKey: string,
    private readonly logger: LoggerPort,
  ) {
  }

  async fetch(request) {
    const dataFetcher = DataFetcherFactory.createDataFetcher(
      request.getContentType(), this.sgxEnabled, this.randomDotOrgApiKey, this.logger,
    );
    const rawData = await dataFetcher.fetch(request);
    this.logger.info(`Data fetched [requestId=${request.id}, rawData=${rawData}]`);

    return rawData;
  }
}

export default FetchDataUseCase;
