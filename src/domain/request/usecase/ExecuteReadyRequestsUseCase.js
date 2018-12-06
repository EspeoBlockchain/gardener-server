class ExecuteReadyRequestsUseCase {
  constructor(requestRepository, logger) {
    this.requestRepository = requestRepository;
    this.logger = logger;
  }

  async executeReadyRequests() {
    const requests = await this.requestRepository.getReadyRequests();//.getRequestsWithValidFromBeforeNow();

    /*return */requests.forEach((request) => {
      fetchData.useCase.fetch
      request.state.markAsProcessed();
      // save
      this.logger.info(`Request ${request.id} marked as processed`);
      ///return request;
    });
  }
}

module.exports = ExecuteReadyRequestsUseCase;
