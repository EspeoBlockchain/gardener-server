class FetchDataUseCase {
  constructor(urlDataFetcher, randomDataFetcher, logger) {
    this.urlDataFetcher = urlDataFetcher;
    this.randomDataFetcher = randomDataFetcher;
    this.logger = logger;
  }

  async fetchHttpData(requestId, rawUrl) {
    const rawData = await this.urlDataFetcher.fetch(rawUrl);
    this.logger.info(`Data fetched [requestId=${requestId}, rawData=${rawData}]`);

    return rawData;
  }

  async fetchRandomData(requestId, min, max) {
    const rawData = await this.randomDataFetcher.fetch(min, max);
    this.logger.info(`Random data fetched [requestId=${requestId}, rawData=${rawData}]`);

    return rawData;
  }
}

module.exports = FetchDataUseCase;
