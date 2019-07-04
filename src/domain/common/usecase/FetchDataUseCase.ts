import LoggerPort from '@core/domain/common/port/LoggerPort';
import DataFetcher from '@core/domain/common/port/DataFetcherPort';

class FetchDataUseCase {
  constructor(
    private readonly dataFetcher: DataFetcher,
    private readonly logger: LoggerPort,
  ) {
  }

  async fetchData(request) {
    const rawData = await this.dataFetcher.fetch(request);
    this.logger.info(`Data fetched [requestId=${request.id}, rawData=${rawData}]`);

    return rawData;
  }
}

export default FetchDataUseCase;
