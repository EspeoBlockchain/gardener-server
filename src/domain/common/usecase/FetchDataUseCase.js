const Response = require('../../response/Response');

class FetchDataUseCase {
  constructor(crawler, responseRepository, logger) {
    this.crawler = crawler;
    this.responseRepository = responseRepository;
    this.logger = logger;
  }

  async fetchDataForRequest(request) {
    const rawUrl = request.getRawUrl();

    const rawData = await this.crawler.fetch(rawUrl);
    this.logger.info(`Data fetched for request ${request.id}: ${rawData}`);

    const response = new Response(request.id);
    response.addFetchedData(rawData);

    this.responseRepository.save(response);
    this.logger.info(`Created response [response=${JSON.stringify(response)}]`);

    return response;
  }
}

module.exports = FetchDataUseCase;
