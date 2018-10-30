const { describe, it } = require('mocha');
const { assert } = require('chai').use(require('chai-as-promised'));
const nock = require('nock');
const perf = require('execution-time')();
const { fetchData } = require('../../src/request');


describe('fetchData', () => {

  const url = 'http://someurl.example.com';

  it('should throw Error if response status is not 200', () => {
    // given
    nock(url).get('/').reply(400);

    // when
    const promise = fetchData(url);

    // when
    return assert.isRejected(promise, Error, 'Request failed');
  });

  it('should return json string response data on successful request', async () => {
    // given
    const mockedResponse = {
      key1: 'value1',
    };
    nock(url).get('/').reply(200, mockedResponse);

    // when
    const responseData = await fetchData(url);

    // then
    const expectedData = JSON.stringify({ key1: 'value1' });

    assert.deepEqual(responseData, expectedData, 'Response data doesn\'t match');
  });

  it('should return xml string response data on successful request', async () => {
    // given
    const mockedResponse = '<key1>value1</key1>';
    nock(url).get('/').reply(200, mockedResponse);

    // when
    const responseData = await fetchData(url);

    // then
    const expectedData = '<key1>value1</key1>';

    assert.deepEqual(responseData, expectedData, 'Response data doesn\'t match');
  });

  it('should return json string response data on successful request AND wait for a given period of time', async () => {
    // given
    const mockedResponse = {
      key1: 'value1',
    };
    const delayTime = 5;
    nock(url).get('/').reply(200, mockedResponse);


    // when
    perf.start('delayedRequest');
    const responseData = await fetchData(url, delayTime);
    const results = perf.stop('delayedRequest');
    // then
    const expectedData = JSON.stringify({ key1: 'value1' });
    assert.deepEqual(responseData, expectedData, 'Response data doesn\'t match');
    assert.isAtLeast(results.time, delayTime * 1000, 'Request doesn\'t wait for given period of time');
  });
});
