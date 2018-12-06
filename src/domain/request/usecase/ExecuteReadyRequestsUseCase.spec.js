const { describe, it } = require('mocha');
const { expect } = require('chai');
const ExecuteReadyRequestsUseCase = require('./ExecuteReadyRequestsUseCase');
const Request = require('../Request');
const Response = require('../../response/Response');

describe('ExecuteReadyRequestsUseCase', () => {
  const oneMinuteMillis = 60 * 1000;

  const requestRepository = () => ({
    getReadyRequests: () => [new Request('123', '123', Date.now() - oneMinuteMillis)],
  });

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

      return response;
    },
  });

  const selectDataUseCase = () => ({
    selectFromRawData: (response) => {
      response.addSelectedData('selectedData');

      return response;
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
    expect(sut.logger.list()).to.have.lengthOf(2);
  });
});
