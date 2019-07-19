import DataFetcher from '@core/domain/common/port/DataFetcherPort';
import LoggerPort from '@core/domain/common/port/LoggerPort';
import Request from '@core/domain/request/Request';

class FetchDataUseCase {
  constructor(
    private readonly dataFetcher: DataFetcher,
    private readonly logger: LoggerPort,
  ) {
  }

  async fetchData(request: Request) {
    const rawData = await this.dataFetcher.fetch(request);
    this.logger.info(`Data fetched [requestId=${request.id}, rawData=${rawData}]`);

    return rawData;
  }
}

export default FetchDataUseCase;
