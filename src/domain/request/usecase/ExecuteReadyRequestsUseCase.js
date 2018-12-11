const Response = require('../../response/Response');

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
      let response;

      request.state.markAsProcessed();
      this.requestRepository.save(request);
      this.logger.info(`Request marked as processed [requestId=${request.id}]`);

      try {
        const fetchedData = await this.fetchDataUseCase.fetchData(request.id, request.getRawUrl());

        response = new Response(request.id);
        response.addFetchedData(fetchedData);
        this.logger.info(`Created response [response=${JSON.stringify(response)}]`);

        const selectedData = await this.selectDataUseCase.selectFromRawData(
          response.fetchedData,
          request.getContentType(),
          request.getSelectionPath(),
        );
        response.addSelectedData(selectedData);
      } catch (e) {
        request.state.markAsFailed();
        this.requestRepository.save(request);
        this.logger.error(`Request marked as failed [requestId=${request.id}]`);
        return;
      }

      try {
        await this.sendResponseToOracleUseCase.sendResponse(response);
        response.state.markAsSent();
        this.logger.info(`Response marked as sent [requestId=${response.requestId}]`);
      } catch (e) {
        response.state.markAsFailed();
        this.logger.info(`Response marked as failed [requestId=${response.requestId}]`);
      } finally {
        this.responseRepository.save(response);
      }

      request.state.markAsFinished();
      this.requestRepository.save(request);
      this.logger.info(`Request marked as finished [requestId=${request.id}]`);
    });

    return Promise.all(promises);
  }
}

module.exports = ExecuteReadyRequestsUseCase;
