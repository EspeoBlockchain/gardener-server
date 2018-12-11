class FetchDataUseCase {
  constructor(urlDataFetcher, logger) {
    this.urlDataFetcher = urlDataFetcher;
    this.logger = logger;
  }

  async fetchData(requestId, rawUrl) {
    const rawData = await this.urlDataFetcher.fetch(rawUrl);
    this.logger.info(`Data fetched [requestid=${requestId}, rawData=${rawData}]`);

    return rawData;
  }
}

module.exports = FetchDataUseCase;
