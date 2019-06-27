const Response = require('../../response/Response');
const InvalidRequestError = require('../../common/utils/error/InvalidRequestError');

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

      const response = await this._fetchAndSelectData(request);
      if (!response) {
        return;
      }

      request.state.markAsFinished();
      this.requestRepository.save(request);
      this.logger.info(`Request marked as finished [requestId=${request.id}]`);

      await this._sendResponse(response);
      this.responseRepository.save(response);
    });

    return Promise.all(promises);
  }

  async _fetchAndSelectData(request) {
    const response = new Response(request.id);
    this.logger.info(`Created response [response=${JSON.stringify(response)}]`);

    try {
      response.addFetchedData(await this._fetch(request));
      response.addSelectedData(await this._select(response.fetchedData, request));

      return response;
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        response.setError(e.code);
        this.logger.error(`Invalid request [errorCode=${e.code}]`, e);

        return response;
      }

      request.state.markAsFailed();
      this.requestRepository.save(request);
      this.logger.error(`Request marked as failed [requestId=${request.id}]`, e);
      return null;
    }
  }

  async _fetch(request) {
    if (request.getContentType() === 'random') {
      return this.fetchDataUseCase.fetchRandomData(
        request.id, request.getLeftSideBound(), request.getRightSideBound(),
      );
    }

    return this.fetchDataUseCase.fetchHttpData(request.id, request.getRawUrl());
  }

  async _select(fetchedData, request) {
    if (request.getContentType() === 'random') {
      return this.selectDataUseCase.selectFromRawData(fetchedData, request.getContentType());
    }

    return this.selectDataUseCase.selectFromRawData(
      fetchedData,
      request.getContentType(),
      request.getSelectionPath(),
    );
  }

  async _sendResponse(response) {
    try {
      await this.sendResponseToOracleUseCase.sendResponse(response);
      response.state.markAsSent();
      this.logger.info(`Response marked as sent [requestId=${response.requestId}]`);
    } catch (e) {
      this.logger.error(`Sending response failed [requestId=${response.requestId}]`, e);
      response.state.markAsFailed();
      this.logger.info(`Response marked as failed [requestId=${response.requestId}]`);
    }
  }
}

module.exports = ExecuteReadyRequestsUseCase;
