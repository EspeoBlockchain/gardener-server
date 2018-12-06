const { describe, it } = require('mocha');
const { expect } = require('chai');
const SelectDataUseCase = require('./SelectDataUseCase');
const Request = require('../../request/Request');
const Response = require('../../response/Response');

describe('SelectDataUseCase', () => {
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

  it('should select appropriate data from fetch one', async () => {
    expect(0).to.equal(1);

    // given
    // const request = new Request('1', 'json(http://example.com).key1', Date.now());
    // const sut = new FetchDataUseCase(crawler(), repository(), logger());
    // // when
    // const response = await sut.fetchDataForRequest(request);
    // // then
    // expect(response.requestId).to.equal('1');
    // expect(response.fetchedData).to.equal(JSON.stringify({ key1: 'value1' }));
    // expect(sut.responseRepository.list()).to.have.lengthOf(1);
    // expect(sut.logger.list()).to.have.lengthOf(2);
  });
});
