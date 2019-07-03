const DataFetcherFactory = require('../../../application/dataFetcher/DataFetcherFactory');

class FetchDataUseCase {
  constructor(sgxEnabled, randomDotOrgApiKey, logger) {
    this.sgxEnabled = sgxEnabled;
    this.randomDotOrgApiKey = randomDotOrgApiKey;
    this.logger = logger;
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

module.exports = FetchDataUseCase;
