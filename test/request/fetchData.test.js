const { describe, it } = require('mocha');
const { assert } = require('chai').use(require('chai-as-promised'));
const nock = require('nock');
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
    nock(url)
      .defaultReplyHeaders({
        'Content-Type': 'application/xml',
      })
      .get('/').reply(200, mockedResponse);

    // when
    const responseData = await fetchData(url);

    // then
    const expectedData = '<key1>value1</key1>';

    assert.deepEqual(responseData, expectedData, 'Response data doesn\'t match');
  });

  it('should return string response data on text content-type', async () => {
    // given
    const mockedResponse = 'test text';
    nock(url)
      .defaultReplyHeaders({
        'Content-Type': 'text',
      })
      .get('/')
      .reply(200, mockedResponse);

    // when
    const responseData = await fetchData(url);

    // then
    const expectedData = 'test text';

    assert.deepEqual(responseData, expectedData, 'Response data doesn\'t match');
  });

  it('should return base64 response data on image content-type', async () => {
    // given
    const mockedResponse = 'PNG file content';
    nock(url)
      .defaultReplyHeaders({
        'Content-Type': 'image/png',
      })
      .get('/')
      .reply(200, mockedResponse);

    // when
    const responseData = await fetchData(url);

    // then
    const expectedData = 'UE5HIGZpbGUgY29udGVudA==';

    assert.deepEqual(responseData, expectedData, 'Response data doesn\'t match');
  });

  it('should throw error on unrecognized content-type', async () => {
    // given
    const mockedResponse = 'test text';
    nock(url)
      .defaultReplyHeaders({
        'Content-Type': 'unrecognized',
      })
      .get('/')
      .reply(200, mockedResponse);

    // when
    return assert.isRejected(fetchData(url), Error, 'Content-Type is unrecognized');
  });
});
