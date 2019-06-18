import { describe, it, beforeEach } from 'mocha';
const { expect } = require('chai').use(require('dirty-chai'));
import IdentitySelectorAdapter from './IdentitySelectorAdapter';

describe('IdentitySelectorAdapter', () => {
  let sut;

  beforeEach(() => {
    sut = new IdentitySelectorAdapter();
  });

  it('should accept ipfs content type', () => {
    // given
    const contentType = 'ipfs';
    // when
    const result = sut.canHandle(contentType);
    // then
    expect(result).to.be.true();
  });

  it('should select always all data', () => {
    // given
    const data = 'abcdef';
    // when
    const result = sut.select(data, null);
    // then
    expect(result).to.equal(data);
  });

  it('should throw an error when not empty path passed', () => {
    // given
    const data = 'abcdef';
    const path = '/something';
    // when, then
    expect(() => sut.select(data, path)).to.throw();
  });
});
