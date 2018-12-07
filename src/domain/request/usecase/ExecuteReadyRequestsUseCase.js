class ExecuteReadyRequestsUseCase {
  constructor(
    fetchDataUseCase,
    selectDataUseCase,
    sendResponseToOracleUseCase,
    requestRepository,
    responseRepository,
    logger,
  ) {
    this.fetchDataUseCase = fetchDataUseCase;
    this.selectDataUseCase = selectDataUseCase;
    this.sendResponseToOracleUseCase = sendResponseToOracleUseCase;
    this.requestRepository = requestRepository;
    this.responseRepository = responseRepository;
    this.logger = logger;
  }

  async executeReadyRequests() {
    const requests = await this.requestRepository.getReadyRequests();

    const promises = requests.map(async (request) => {
      request.state.markAsProcessed();
      this.logger.info(`Request ${request.id} marked as processed`);
      try {
        let response = await this.fetchDataUseCase.fetchDataForRequest(request);
        response = await this.selectDataUseCase.selectFromRawData(request, response);
        response = await this.sendResponseToOracleUseCase.sendResponse(response);
        this.responseRepository.save(response);
      } catch (e) {
        request.state.markAsFailed();
        this.requestRepository.save(request);
        this.logger.error(`Request ${request.id} marked as failed`);
        return;
      }

      request.state.markAsFinished();
      this.requestRepository.save(request);
      this.logger.info(`Request ${request.id} marked as finished`);
    });

    return Promise.all(promises);
  }
}

module.exports = ExecuteReadyRequestsUseCase;
