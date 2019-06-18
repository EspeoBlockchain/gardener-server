class FetchDataUseCase {
  urlDataFetcher: any;
  logger: any;
  constructor(urlDataFetcher, logger) {
    this.urlDataFetcher = urlDataFetcher;
    this.logger = logger;
  }

  async fetchData(requestId, rawUrl) {
    const rawData = await this.urlDataFetcher.fetch(rawUrl);
    this.logger.info(`Data fetched [requestId=${requestId}, rawData=${rawData}]`);

    return rawData;
  }
}

export default FetchDataUseCase;
