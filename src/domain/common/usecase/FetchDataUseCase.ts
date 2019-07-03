import LoggerPort from '@core/domain/common/port/LoggerPort';
import UrlDataFetcher from '@core/domain/common/port/UrlDataFetcherPort';

class FetchDataUseCase {
  constructor(
    private readonly urlDataFetcher: UrlDataFetcher,
    private readonly logger: LoggerPort,
  ) {
  }

  async fetchData(requestId, rawUrl) {
    const rawData = await this.urlDataFetcher.fetch(rawUrl);
    this.logger.info(`Data fetched [requestId=${requestId}, rawData=${rawData}]`);

    return rawData;
  }
}

export default FetchDataUseCase;
