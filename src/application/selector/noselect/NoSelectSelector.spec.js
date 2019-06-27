const { describe, it } = require('mocha');
const { expect } = require('chai');
const NoSelectSelectorAdapter = require('./NoSelectSelectorAdapter');

describe('NoSelectSelector', () => {
  it('should accept random contentType', () => {
    expect(NoSelectSelectorAdapter.canHandle('random')).to.equal(true);
  });

  it('should reject xml/json contentType', () => {
    expect(NoSelectSelectorAdapter.canHandle('xml')).to.equal(false);
    expect(NoSelectSelectorAdapter.canHandle('json')).to.equal(false);
  });

  it('should return data as-is', () => {
    // given
    const data = 'some-data';
    // when
    const result = NoSelectSelectorAdapter.select(data, 'some-path');
    // then
    expect(result).to.equal(data, 'Data should be returned unmodified');
  });
});
