const RequestStateEnum = require('../RequestStateEnum');

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

    const promises = requests.map(async (req) => {
      req.state.markAsProcessed();
      this.logger.info(`Request ${req.id} marked as processed`);
      let result = await this.fetchDataUseCase.fetchDataForRequest(req);
      if (result.request.state.name === RequestStateEnum.FAILED) {
        this.requestRepository.save(result.request);
        return;
      }

      result = await this.selectDataUseCase.selectFromRawData(result.request, result.response);
      if (result.request.state.name === RequestStateEnum.FAILED) {
        this.requestRepository.save(result.request);
        return;
      }

      result.request.state.markAsFinished();
      this.logger.info(`Request ${result.request.id} marked as finished`);
      result.response.state.markAsSent();
      this.logger.info(`Response for request ${result.response.requestId} marked as sent`);
      this.responseRepository.save(result.response);
    });

    return Promise.all(promises);
  }
}

module.exports = ExecuteReadyRequestsUseCase;
