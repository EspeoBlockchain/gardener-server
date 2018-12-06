const { describe, it } = require('mocha');
const { expect } = require('chai');
const SelectDataUseCase = require('./SelectDataUseCase');
const Request = require('../../request/Request');
const RequestStateEnum = require('../../request/RequestStateEnum');
const Response = require('../../response/Response');

describe('SelectDataUseCase', () => {
  const repository = () => {
    const requests = [];
    return {
      save: req => requests.push(req),
      list: () => requests,
    };
  };

  const logger = () => {
    const logs = [];
    return {
      info: log => logs.push(log),
      list: () => logs,
    };
  };

  const finder = () => ({
    find: () => ({ select: () => 'selectedData' }),
  });

  it('should select appropriate data from fetch one', async () => {
    // given
    const sut = new SelectDataUseCase(finder(), repository(), logger());
    const request = new Request('id', 'json(http://xample.com).key1', Date.now(), RequestStateEnum.PROCESSED);
    const response = new Response('id');
    response.addFetchedData('fetchedData');
    // when
    const { request: req, response: responseWithSelectedData } = await sut.selectFromRawData(request, response);
    // then
    expect(responseWithSelectedData.selectedData).to.equal('selectedData');
    expect(sut.logger.list()).to.have.lengthOf(1);
  });
});
