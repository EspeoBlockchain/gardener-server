/* eslint-disable no-unused-vars */
const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const FetchDataUseCase = require('./FetchDataUseCase');
const Request = require('../../request/Request');
const RequestStateEnum = require('../../request/RequestStateEnum');
const { logger } = require('../utils/TestMocks');

describe('FetchDataUseCase', () => {
  const urlDataFetcher = () => ({
    fetch: url => JSON.stringify({ key1: 'value1' }),
  });

  const failingDataFetcher = () => ({
    fetch: (url) => { throw new Error(); },
  });

  it('should fetch data for request, create response and pass result into it', async () => {
    // given
    const request = new Request('1', 'json(http://example.com).key1', Date.now());
    const sut = new FetchDataUseCase(urlDataFetcher(), logger());
    // when
    const response = await sut.fetchData(request.id, 'http://example.com');
    // then
    expect(response.requestId).to.equal('1');
    expect(response.fetchedData).to.equal(JSON.stringify({ key1: 'value1' }));
    expect(sut.logger.list()).to.have.lengthOf(2);
  });

  it('should throw error if data fetch failed', () => {
    const request = new Request('1', 'json(http://example.com).key1', Date.now(), RequestStateEnum.PROCESSED);
    const sut = new FetchDataUseCase(failingDataFetcher(), logger());
    // when
    return expect(sut.fetchData(request)).to.be.rejected;
  });
});
