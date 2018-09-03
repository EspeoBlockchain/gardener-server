const { describe, it } = require('mocha');
const { assert } = require('chai');
const { resolveRequestPattern } = require('../../src/request');

describe('resolveRequestPattern', () => {
  it('should correctly resolve json pattern', () => {
    // given
    const request = 'json(http://someurl.example.com).value1';

    // when
    const res = resolveRequestPattern(request);

    // then
    assert.equal(res.type, 'json', 'Request type should be json');
    assert.equal(res.url, 'http://someurl.example.com', 'Request url doesn\'t match');
    assert.equal(res.path, 'value1', 'Request path doesn\'t match');
  });

  it('should correctly resolve nested path', () => {
    // given
    const request = 'json(http://someurl.example.com).value1.value2';

    // when
    const res = resolveRequestPattern(request);

    // then
    assert.equal(res.type, 'json', 'Request type should be json');
    assert.equal(res.url, 'http://someurl.example.com', 'Request url doesn\'t match');
    assert.equal(res.path, 'value1.value2', 'Request path doesn\'t match');
  });

  it('should correctly resolve request with https', () => {
    // given
    const request = 'json(https://someurl.example.com).value1';

    // when
    const res = resolveRequestPattern(request);

    // then
    assert.equal(res.type, 'json', 'Request type should be json');
    assert.equal(res.url, 'https://someurl.example.com', 'Request url doesn\'t match');
    assert.equal(res.path, 'value1', 'Request path doesn\'t match');
  });

  it('should throw Error if request type is neither json nor xml', () => {
    // given
    const request = 'invalid(https://someurl.example.com).value1';

    // when
    assert.throws(() => resolveRequestPattern(request), Error, 'Request type is neither json nor xml');
  });
});
