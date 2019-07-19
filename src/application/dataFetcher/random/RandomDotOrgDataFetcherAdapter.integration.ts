import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as nock from 'nock';

import Request from '../../../domain/request/Request';
import RandomDotOrgDataFetcherAdapter from './RandomDotOrgDataFetcherAdapter';
import {response} from './RandomDotOrgResponse';

describe('Random.org Integration Test', () => {
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
