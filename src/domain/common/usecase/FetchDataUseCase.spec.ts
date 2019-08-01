import { expect } from '@core/config/configuredChai';
import { describe, it } from 'mocha';

import SilentLogger from '@core/application/logger/SilentLoggerAdapter';
import Request from '@core/domain/request/Request';
import { RequestStateEnum } from '@core/domain/request/RequestStateEnum';
import FetchDataUseCase from './FetchDataUseCase';

describe('FetchDataUseCase', () => {
  const urlDataFetcher = () => ({
    fetch: (request: Request) => Promise.resolve(JSON.stringify({ key1: 'value1' })),
  });

  const someError = new Error();
  const failingDataFetcher = () => ({
    fetch: (request: Request) => Promise.reject(someError),
  });

  it('should fetch data for request and return rawData', async () => {
    // given
    const request = new Request('1', 'json(http://example.com).key1', Date.now());
    const sut = new FetchDataUseCase(urlDataFetcher(), new SilentLogger());
    // when
    const fetchedData = await sut.fetchData(request);
    // then
    expect(fetchedData).to.equal('{"key1":"value1"}');
  });

  it('should throw error if data fetch failed', () => {
    const request = new Request('1', 'json(http://example.com).key1', Date.now(), RequestStateEnum.PROCESSED);
    const sut = new FetchDataUseCase(failingDataFetcher(), new SilentLogger());
    // when
    return expect(sut.fetchData(request)).to.be.rejectedWith(someError);
  });
});
