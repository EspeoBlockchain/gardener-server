const { describe, it } = require('mocha');
const { assert } = require('chai');
const { selectData } = require('../../src/request');

describe('selectData', () => {
  it('should throw Error if type is neither json nor xml', () => {
    // given
    const jsonString = JSON.stringify({ key1: 'value1', key2: 'value2' });
    const request = { type: 'invalid', path: 'key1' };

    // when
    assert.throws(() => selectData(jsonString, request), Error, 'Invalid type: neither json nor xml');
  });

  describe('json selection', () => {
    it('should return value1 from key1 from json payload', () => {
      // given
      const jsonString = JSON.stringify({ key1: 'value1', key2: 'value2' });
      const request = { type: 'json', path: 'key1' };

      // when
      const res = selectData(jsonString, request);

      // then
      assert.equal(res, 'value1', 'Selected data doesn\'t match');
    });

    it('should return object under key1 from json payload', () => {
      // given
      const jsonString = JSON.stringify({ key1: { key3: 'value3' }, key2: 'value2' });
      const request = { type: 'json', path: 'key1' };

      // when
      const res = selectData(jsonString, request);

      // then
      assert.equal(res, JSON.stringify({ key3: 'value3' }), 'Selected data doesn\'t match');
    });

    it('should return value4 from from nested query in json payload', () => {
      // given
      const jsonString = JSON.stringify({ key1: [{ key3: 'value3' }, { key4: 'value4' }], key2: 'value2' });
      const request = { type: 'json', path: 'key1[1].key4' };

      // when
      const res = selectData(jsonString, request);

      // then
      assert.equal(res, 'value4', 'Selected data doesn\'t match');
    });
  });

  describe('xml selection', () => {
    it('should return value1 from key1 from xml payload', () => {
      // given
      const xmlString = '<key1>value1</key1>';
      const request = { type: 'xml', path: '/key1' };

      // when
      const res = selectData(xmlString, request);

      // then
      assert.equal(res, 'value1', 'Selected data doesn\'t match');
    });

    it('should return object under key1 from xml payload', () => {
      // given
      const xmlString = '<key1><key3>value3</key3></key1><key2>value2</key2>';
      const request = { type: 'xml', path: '/key1' };

      // when
      const res = selectData(xmlString, request);

      // then
      assert.equal(res, '<key3>value3</key3>', 'Selected data doesn\'t match');
    });
  });

  describe('html selection', () => {
    it('should return value1 from key1 from html payload', () => {
      // given
      const htmlString = '<html><body><key1>value1</key1></body></html>';
      const request = { type: 'html', path: '/html/body/key1' };

      // when
      const res = selectData(htmlString, request);

      // then
      assert.equal(res, 'value1', 'Selected data doesn\'t match');
    });

    it('should return object under key1 from html payload', () => {
      // given
      const xmlString = '<html><head><key1><key3>value3</key3></key1></head><body><key2>value2</key2></body></html>';
      const request = { type: 'html', path: '/html/head/key1' };

      // when
      const res = selectData(xmlString, request);

      // then
      assert.equal(res, '<key3>value3</key3>', 'Selected data doesn\'t match');
    });
  });

  describe('ipfs selection', () => {
    it('should return data', () => {
      // given
      const ipfsData = 'hello world';
      const request = { type: 'ipfs', path: '' };

      // when
      const res = selectData(ipfsData, request);

      // then
      assert.equal(res, 'hello world', 'Selected data doesn\'t match');
    });
  });
});
