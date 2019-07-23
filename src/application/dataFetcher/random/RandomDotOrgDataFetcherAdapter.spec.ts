import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as nock from 'nock';

import Request from '@core/domain/request/Request';
import {response} from '@testData/application/dataFetcher/random/RandomDotOrgResponse';
import RandomDotOrgDataFetcherAdapter from './RandomDotOrgDataFetcherAdapter';

describe('RandomSgxDataFetcherAdapter', () => {
  const request = new Request('SOME_REQUEST_ID', 'random(0,10)', null);

  it('return first data item on successful response', async () => {
    // given
    nock('https://api.random.org')
      .post('/json-rpc/2/invoke')
      .reply(200, response);
    const sut = new RandomDotOrgDataFetcherAdapter('some-api-key');
    // when
    const result = await sut.fetch(request);
    // then
    expect(result).to.equal('2');
  });

  it('throw error on failed response', async () => {
    // given
    nock('https://api.random.org')
      .post('/json-rpc/2/invoke')
      .reply(500);
    const sut = new RandomDotOrgDataFetcherAdapter('some-api-key');
    // when
    // then
    return expect(sut.fetch(request)).to.be.rejected;
  });
});
