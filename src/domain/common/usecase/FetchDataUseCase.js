class FetchDataUseCase {
  constructor(urlDataFetcher, logger) {
    this.urlDataFetcher = urlDataFetcher;
    this.logger = logger;
  }

  async fetchData(request) {
    const rawData = await this.urlDataFetcher.fetch(request);
    this.logger.info(`Data fetched [requestId=${request.id}, rawData=${rawData}]`);

    return rawData;
  }
}

module.exports = FetchDataUseCase;
