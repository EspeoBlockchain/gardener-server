/* eslint-disable no-unused-vars */
import { expect } from '@core/config/configuredChai';
import { describe, it } from 'mocha';
import {ConsoleLoggerAdapter} from '../../../adapter';
import Request from '../../request/Request';
import { RequestStateEnum } from '../../request/RequestStateEnum';
import FetchDataUseCase from './FetchDataUseCase';

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
    const sut = new FetchDataUseCase(urlDataFetcher(), new ConsoleLoggerAdapter());
    // when
    const fetchedData = await sut.fetchData(request.id, 'http://example.com');
    // then
    expect(fetchedData).to.equal('{"key1":"value1"}');
  });

  it('should throw error if data fetch failed', () => {
    const request = new Request('1', 'json(http://example.com).key1', Date.now(), RequestStateEnum.PROCESSED);
    const sut = new FetchDataUseCase(failingDataFetcher(), new ConsoleLoggerAdapter());
    // when
    return expect(() => sut.fetchData(request.id, request.getRawUrl())).to.be.rejected;
  });
});
