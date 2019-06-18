const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('dirty-chai'));
const JsonResultConverter = require('./JsonResultConverter');

describe('JsonResultConverter', () => {
  it('should return null when empty collection passed', () => {
    // given
    const data = [];
    // when
    const result = JsonResultConverter.toString(data);
    // then
    expect(result).to.be.null();
  });

  it('should return raw value if collection has only one element which is a string', () => {
    // given
    const data = ['a'];
    // when
    const result = JsonResultConverter.toString(data);
    // then
    expect(result).to.equal('a');
  });

  it('should return stringified value if collections has only one element which is not a string', () => {
    // given
    const data = [{ a: 1 }];
    // when
    const result = JsonResultConverter.toString(data);
    // then
    expect(result).to.equal('{"a":1}');
  });

  it('should return stringified array if collections has more than one element', () => {
    // given
    const data = [1, 2, 3];
    // when
    const result = JsonResultConverter.toString(data);
    // then
    expect(result).to.equal('[1,2,3]');
  });
});
