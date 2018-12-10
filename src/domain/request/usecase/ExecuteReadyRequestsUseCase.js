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
      this.requestRepository.save(request);
      this.logger.info(`Request marked as processed [requestId=${request.id}]`);
      try {
        let response = await this.fetchDataUseCase.fetchData(request.id, request.getRawUrl());
        response = await this.selectDataUseCase.selectFromRawData(request, response);
        response = await this.sendResponseToOracleUseCase.sendResponse(response);
        this.responseRepository.save(response);
      } catch (e) {
        request.state.markAsFailed();
        this.requestRepository.save(request);
        this.logger.error(`Request marked as failed [requestId=${request.id}]`);
        return;
      }

      request.state.markAsFinished();
      this.requestRepository.save(request);
      this.logger.info(`Request marked as finished [requestId=${request.id}]`);
    });

    return Promise.all(promises);
  }
}

module.exports = ExecuteReadyRequestsUseCase;
