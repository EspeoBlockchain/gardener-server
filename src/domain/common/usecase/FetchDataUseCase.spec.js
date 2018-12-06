const { describe, it } = require('mocha');
const { expect } = require('chai');
const FetchDataUseCase = require('./FetchDataUseCase');
const Request = require('../../request/Request');

describe('FetchDataUseCase', () => {
  const repository = () => {
    const requests = [];
    return {
      save: req => requests.push(req),
      list: () => requests,
    };
  };

  const crawler = () => ({
    // eslint-disable-next-line no-unused-vars
    fetch: url => JSON.stringify({ key1: 'value1' }),
  });

  const logger = () => {
    const logs = [];
    return {
      info: log => logs.push(log),
      list: () => logs,
    };
  };

  it('should fetch data for request, create response and pass result into it', async () => {
    // given
    const request = new Request('1', 'json(http://example.com).key1', Date.now());
    const sut = new FetchDataUseCase(crawler(), repository(), logger());
    // when
    const response = await sut.fetchDataForRequest(request);
    // then
    expect(response.requestId).to.equal('1');
    expect(response.fetchedData).to.equal(JSON.stringify({ key1: 'value1' }));
    expect(sut.responseRepository.list()).to.have.lengthOf(1);
    expect(sut.logger.list()).to.have.lengthOf(2);
  });
});
