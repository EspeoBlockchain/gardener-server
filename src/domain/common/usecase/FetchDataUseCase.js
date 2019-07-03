class FetchDataUseCase {
  constructor(dataFetcher, logger) {
    this.dataFetcher = dataFetcher;
    this.logger = logger;
  }

  async fetchData(request) {
    const rawData = await this.dataFetcher.fetch(request);
    this.logger.info(`Data fetched [requestId=${request.id}, rawData=${rawData}]`);

    return rawData;
  }
}

module.exports = FetchDataUseCase;
