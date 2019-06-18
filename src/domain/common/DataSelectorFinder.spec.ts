const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const DataSelectorFinder = require('./DataSelectorFinder');


describe('DataSelectorFinder', () => {
  it('should select selector which can handle given contentType', async () => {
    // given
    const selectors = [
      { canHandle: contentType => contentType === 'json' },
    ];
    const sut = new DataSelectorFinder(selectors);

    // when
    const result = sut.find('json');

    // then
    expect(result).to.equal(selectors[0]);
  });

  it('should throw error if there are no selector, which can handle given contentType', async () => {
    // given
    const selectors = [
      { canHandle: contentType => contentType === 'xml' },
    ];
    const sut = new DataSelectorFinder(selectors);

    // when, then
    expect(() => sut.find('json')).to.throw(Error, 'Lack of selector supporting json');
  });

  it('should throw error if there is more than one selector, which can handle give contentType', async () => {
    // given
    const selectors = [
      { canHandle: contentType => contentType === 'json' },
      { canHandle: contentType => contentType === 'json' },
    ];
    const sut = new DataSelectorFinder(selectors);

    // when, then
    expect(() => sut.find('json')).to.throw(Error, 'More than one selector supporting json');
  });
});
