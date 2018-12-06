class ExecuteReadyRequestsUseCase {
  constructor(fetchDataUseCase, selectDataUseCase, requestRepository, responseRepository, logger) {
    this.fetchDataUseCase = fetchDataUseCase;
    this.selectDataUseCase = selectDataUseCase;
    this.requestRepository = requestRepository;
    this.responseRepository = responseRepository;
    this.logger = logger;
  }

  async executeReadyRequests() {
    const requests = await this.requestRepository.getReadyRequests();

    const promises = requests.map(async (request) => {
      request.state.markAsProcessed();
      this.logger.info(`Request ${request.id} marked as processed`);
      let response = await this.fetchDataUseCase.fetchDataForRequest(request);
      response = await this.selectDataUseCase.selectFromRawData(response);
      response.state.markAsSent();
      this.logger.info(`Response for request ${response.requestId} marked as sent`);
      this.responseRepository.save(response);
    });

    return Promise.all(promises);
  }
}

module.exports = ExecuteReadyRequestsUseCase;
