/* eslint-disable no-unused-vars */
const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const FetchDataUseCase = require('./FetchDataUseCase');
const Request = require('../../request/Request');
const RequestStateEnum = require('../../request/RequestStateEnum');
const { Logger } = require('../utils/TestMocks');

describe('FetchDataUseCase', () => {
  const urlDataFetcher = () => ({
    fetch: url => Promise.resolve(JSON.stringify({ key1: 'value1' })),
  });

  const failingDataFetcher = () => ({
    fetch: url => Promise.reject(new Error()),
  });

  it('should fetch data for request and return rawData', async () => {
    // given
    const request = new Request('1', 'json(http://example.com).key1', Date.now());
    const sut = new FetchDataUseCase(urlDataFetcher(), failingDataFetcher(), new Logger());
    // when
    const fetchedData = await sut.fetchHttpData(request.id, 'http://example.com');
    // then
    expect(fetchedData).to.equal('{"key1":"value1"}');
    expect(sut.logger.list()).to.have.lengthOf(1);
  });

  it('should throw error if data fetch failed', () => {
    const request = new Request('1', 'json(http://example.com).key1', Date.now(), RequestStateEnum.PROCESSED);
    const sut = new FetchDataUseCase(failingDataFetcher(), failingDataFetcher, new Logger());
    // when
<<<<<<< HEAD
    return expect(sut.fetchHttpData(request.id, request.getRawUrl())).to.be.rejected;
=======
    return expect(() => sut.fetchData(request.id, request.getRawUrl())).to.be.rejected;
>>>>>>> master
  });
});
