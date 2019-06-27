const { describe, it } = require('mocha');
const { expect } = require('chai');
const nock = require('nock');
const RandomDotOrgDataFetcherAdapter = require('./RandomDotOrgDataFetcherAdapter');
const response = require('./RandomDotOrgResponse');

describe('Random.org Integration Test', () => {
  it('return first data item on successful response', async () => {
    // given
    nock('https://api.random.org')
      .post('/json-rpc/2/invoke')
      .reply(200, response);
    const sut = new RandomDotOrgDataFetcherAdapter('some-api-key');
    // when
    const result = await sut.fetch(0, 10);
    // then
    expect(result).to.equal('2');
  });
});

describe('Random.org Integration Test', () => {
  it('throw error on failed response', async () => {
    // given
    nock('https://api.random.org')
      .post('/json-rpc/2/invoke')
      .reply(500);
    const sut = new RandomDotOrgDataFetcherAdapter('some-api-key');
    // when
    // then
    return expect(sut.fetch(0, 10)).to.be.rejected;
  });
});
