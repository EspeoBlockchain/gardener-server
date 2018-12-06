const Response = require('../../response/Response');

class FetchDataUseCase {
  constructor(dataClient, responseRepository, logger) {
    this.dataClient = dataClient;
    this.responseRepository = responseRepository;
    this.logger = logger;
  }

  async fetchDataForRequest(request) {
    const rawUrl = request.getRawUrl();

    const rawData = await this.dataClient.fetch(rawUrl);
    this.logger.info(`Data fetched for request ${request.id}: ${rawData}`);

    const response = new Response(request.id);
    response.addFetchedData(rawData);

    this.responseRepository.save(response);
    this.logger.info(`Created response [response=${JSON.stringify(response)}]`);

    return response;
  }
}

module.exports = FetchDataUseCase;
