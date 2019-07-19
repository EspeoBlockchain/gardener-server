import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';

import NoSelectSelectorAdapter from './NoSelectSelectorAdapter';

describe('NoSelectSelector', () => {
  let sut;

  beforeEach(() => {
    sut = new NoSelectSelectorAdapter();
  });

  it('should accept random contentType', () => {
    expect(sut.canHandle('random')).to.equal(true);
  });

  it('should reject xml/json contentType', () => {
    expect(sut.canHandle('xml')).to.equal(false);
    expect(sut.canHandle('json')).to.equal(false);
  });

  it('should return data as-is', () => {
    // given
    const data = 'some-data';
    // when
    const result = sut.select(data, 'some-path');
    // then
    expect(result).to.equal(data, 'Data should be returned unmodified');
  });
});
