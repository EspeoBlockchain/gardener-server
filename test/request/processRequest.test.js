const { describe, it } = require('mocha');
const nock = require('nock');
const { assert } = require('chai');
const { processRequest } = require('../../src/request');


describe('processRequest', () => {
  describe('json processing', async () => {
    it('should process given url to return selected data', async () => {
      // given
      const request = 'json(http://someurl.example.com).key1';
      const mockedResponse = {
        key1: 'value1',
      };
      nock('http://someurl.example.com').get('/').reply(200, mockedResponse);

      // when
      const res = await processRequest(request);

      // then
      assert.equal(res, 'value1', 'Invalid return data from processing');
    });
  });

  describe('xml processing', async () => {
    it('should process given url to return selected data', async () => {
      // given
      const request = 'xml(http://someurl.example.com)/key1';
      const mockedResponse = '<key1>value1</key1>';
      nock('http://someurl.example.com').get('/').reply(200, mockedResponse);

      // when
      const res = await processRequest(request);

      // then
      assert.equal(res, 'value1', 'Invalid return data from processing');
    });
  });
});
