const { describe, it } = require('mocha');
const { expect } = require('chai');
const ExecuteReadyRequestsUseCase = require('./ExecuteReadyRequestsUseCase');
const Request = require('../Request');
const Response = require('../../response/Response');
const { logger } = require('../../common/utils/TestMocks');

describe('ExecuteReadyRequestsUseCase', () => {
  const oneMinuteMillis = 60 * 1000;

  const requestRepository = () => {
    const requests = [];

    return {
      getReadyRequests: () => [new Request('123', 'json(http://example.com).key1', Date.now() - oneMinuteMillis)],
      list: () => requests,
      save: request => requests.push(request),
    };
  };

  const responseRepository = () => {
    const responses = [];
    return {
      save: res => responses.push(res),
      list: () => responses,
    };
  };

  const fetchDataUseCase = () => ({
    fetchData: (requestId, url) => {
      const response = new Response(requestId);
      response.addFetchedData('fetchedData');

      return response;
    },
  });

  const failedFetchDataUseCase = () => ({
    fetchDataForRequest: () => { throw new Error(); },
  });

  const selectDataUseCase = () => ({
    selectFromRawData: (request, response) => {
      response.addSelectedData('selectedData');

      return response;
    },
  });

  const failedSelectDataUseCase = () => ({
    selectFromRawData: () => { throw new Error(); },
  });

  const sendResponseToOracleUseCase = () => ({
    sendResponse: (response) => {
      response.state.markAsSent();

      return response;
    },
  });

  it('should execute ready request which is finished after that and generate response', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      selectDataUseCase(),
      sendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    const response = await sut.responseRepository.list()[0];
    expect(response.requestId).to.equal('123');
    expect(response.fetchedData).to.equal('fetchedData');
    expect(response.selectedData).to.equal('selectedData');
    expect(response.state.name).to.equal('Sent');
    expect(sut.logger.list()).to.have.lengthOf(2);
  });

  it('should mark request as failed if data cannot be fetched', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      failedFetchDataUseCase(),
      selectDataUseCase(),
      sendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    expect(sut.requestRepository.list()[0].state.name).to.equal('Failed');
  });

  it('should mark request as failed if data cannot be selected', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      failedSelectDataUseCase(),
      sendResponseToOracleUseCase(),
      requestRepository(),
      responseRepository(),
      logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    expect(sut.requestRepository.list()[0].state.name).to.equal('Failed');
  });
});
