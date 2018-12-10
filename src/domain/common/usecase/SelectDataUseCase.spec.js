const { describe, it } = require('mocha');
const { expect } = require('chai');
const SelectDataUseCase = require('./SelectDataUseCase');
const Request = require('../../request/Request');
const RequestStateEnum = require('../../request/RequestStateEnum');
const Response = require('../../response/Response');
const { logger } = require('../utils/TestMocks');

describe('SelectDataUseCase', () => {
  const finder = () => ({
    find: () => ({ select: () => 'selectedData' }),
  });

  it('should select appropriate data from fetch one', async () => {
    // given
    const sut = new SelectDataUseCase(finder(), logger());
    const request = new Request('id', 'json(http://xample.com).key1', Date.now(), RequestStateEnum.PROCESSED);
    let response = new Response('id');
    response.addFetchedData('fetchedData');
    // when
    response = await sut.selectFromRawData(request, response);
    // then
    expect(response.selectedData).to.equal('selectedData');
    expect(sut.logger.list()).to.have.lengthOf(1);
  });
});
