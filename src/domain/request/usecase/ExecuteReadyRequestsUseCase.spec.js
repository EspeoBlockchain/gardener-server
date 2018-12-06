const { describe, it } = require('mocha');
const { expect } = require('chai');
const ExecuteReadyRequestsUseCase = require('./ExecuteReadyRequestsUseCase');
const Request = require('../Request');
const Response = require('../../response/Response');

describe('ExecuteReadyRequestsUseCase', () => {
  const oneMinuteMillis = 60 * 1000;

  const requestRepository = () => {
    const requests = [];

    return {
      getReadyRequests: () => [new Request('123', '123', Date.now() - oneMinuteMillis)],
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


  const logger = () => {
    const logs = [];
    return {
      info: log => logs.push(log),
      list: () => logs,
    };
  };

  const fetchDataUseCase = () => ({
    fetchDataForRequest: (request) => {
      const response = new Response(request.id);
      response.addFetchedData('fetchedData');

      return { request, response };
    },
  });

  const failedFetchDataUseCase = () => ({
    fetchDataForRequest: (request) => {
      request.state.markAsFailed();

      return { request };
    },
  });

  const selectDataUseCase = () => ({
    selectFromRawData: (request, response) => {
      response.addSelectedData('selectedData');

      return { request, response };
    },
  });

  const failedSelectDataUseCase = () => ({
    selectFromRawData: (request, response) => {
      request.state.markAsFailed();

      return { request };
    },
  });

  it('should execute ready request which is finished after that and generate response', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      selectDataUseCase(),
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
    expect(sut.logger.list()).to.have.lengthOf(3);
  });

  it('should mark request as failed if cannot fetch data', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      failedFetchDataUseCase(),
      selectDataUseCase(),
      requestRepository(),
      responseRepository(),
      logger(),
    );
    // when
    await sut.executeReadyRequests();
    // then
    expect(sut.requestRepository.list()[0].state.name).to.equal('Failed');
  });

  it('should mark request as failed if cannot select data', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(
      fetchDataUseCase(),
      failedSelectDataUseCase(),
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
