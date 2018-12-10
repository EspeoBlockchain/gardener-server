const Response = require('../../response/Response');

class FetchDataUseCase {
  constructor(urlDataFetcher, logger) {
    this.urlDataFetcher = urlDataFetcher;
    this.logger = logger;
  }

  async fetchData(requestId, rawUrl) {
    const rawData = await this.urlDataFetcher.fetch(rawUrl);
    this.logger.info(`Data fetched [requestid=${requestId}, rawData=${rawData}]`);
    const response = new Response(requestId);
    response.addFetchedData(rawData);

    this.logger.info(`Created response [response=${JSON.stringify(response)}]`);

    return response;
  }
}

module.exports = FetchDataUseCase;
