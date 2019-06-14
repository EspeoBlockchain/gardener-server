const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const JsonSelectorAdapter = require('./JsonSelectorAdapter');

describe('JsonSelectorAdapter', () => {
  let sut;

  beforeEach(() => {
    sut = new JsonSelectorAdapter();
  });

  it('should accept json content type', () => {
    // given
    const contentType = 'json';
    // when
    const result = sut.canHandle(contentType);
    // then
    expect(result).to.equal(true);
  });

  it('should select attribute value', () => {
    // given
    const jsonString = JSON.stringify({ key1: 'value' });
    const responsePath = '.key1';

    // when
    const res = sut.select(jsonString, responsePath);

    // then
    expect(res).to.equal('value');
  });

  it('should select an object', () => {
    // given
    const jsonString = JSON.stringify({ key1: { key2: 'value' } });
    const responsePath = '.key1';

    // when
    const res = sut.select(jsonString, responsePath);

    // then
    expect(res).to.equal('{"key2":"value"}');
  });

  it('should return null if no match found', () => {
    // given
    const jsonString = JSON.stringify({ key3: 'value' });
    const responsePath = '.key1';

    // when
    const res = sut.select(jsonString, responsePath);

    // then
    expect(res).to.equal(null);
  });

  it('should select all data when no path passed', () => {
    // given
    const jsonString = JSON.stringify({ key1: 'value' });
    const responsePath = null;

    // when
    const res = sut.select(jsonString, responsePath);

    // then
    expect(res).to.equal('{"key1":"value"}');
  });

  it('should throw an error when invalid JsonPath passed', () => {
    // given
    const jsonString = JSON.stringify({ key1: 'value' });
    const responsePath = '!?X';

    // when, then
    expect(() => sut.select(jsonString, responsePath)).to.throw();
  });

  it('should throw an error when invalid json passed', () => {
    // given
    const jsonString = 'invalid';
    const responsePath = '.key1';

    // when, then
    expect(() => sut.select(jsonString, responsePath)).to.throw();
  });

  it('should select multiple simple results in a form of stringified array', () => {
    const jsonString = JSON.stringify({ key1: ['value', 'value2'] });
    const responsePath = '.key1';

    // when
    const res = sut.select(jsonString, responsePath);

    // then
    expect(res).to.equal('["value","value2"]');
  });

  it('should select multiple object results in a form of stringified array', () => {
    const jsonString = JSON.stringify({
      key1: [
        { key2: 'value' },
        { key3: 'value2' },
      ],
    });
    const responsePath = '.key1';

    // when
    const res = sut.select(jsonString, responsePath);

    // then
    expect(res).to.equal('[{"key2":"value"},{"key3":"value2"}]');
  });
});
