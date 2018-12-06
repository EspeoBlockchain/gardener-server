const Response = require('../../response/Response');

class FetchDataUseCase {
  constructor(dataClient, logger) {
    this.dataClient = dataClient;
    this.logger = logger;
  }

  async fetchDataForRequest(request) {
    const rawUrl = request.getRawUrl();
    let rawData;

    try {
      rawData = await this.dataClient.fetch(rawUrl);
      this.logger.info(`Data fetched for request ${request.id}: ${rawData}`);
    } catch (e) {
      this.logger.error(`Cannot fetch data for request ${request.id}`);
      request.state.markAsFailed();

      return { request };
    }

    const response = new Response(request.id);
    response.addFetchedData(rawData);

    this.logger.info(`Created response [response=${JSON.stringify(response)}]`);

    return { request, response };
  }
}

module.exports = FetchDataUseCase;
