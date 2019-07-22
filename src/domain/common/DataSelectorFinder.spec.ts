import { describe, it } from 'mocha';

import { expect } from '@core/config/configuredChai';

import DataSelectorFinder from './DataSelectorFinder';

describe('DataSelectorFinder', () => {
  it('should select selector which can handle given contentType', async () => {
    // given
    const selectors = [
      { canHandle: (contentType: any) => contentType === 'json', select: (data: any, path: string) => '' },
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
      { canHandle: (contentType: any) => contentType === 'xml', select: (data: any, path: string) => '' },
    ];
    const sut = new DataSelectorFinder(selectors);

    // when, then
    expect(() => sut.find('json')).to.throw(Error, 'Lack of selector supporting json');
  });

  it('should throw error if there is more than one selector, which can handle give contentType', async () => {
    // given
    const selectors = [
      { canHandle: (contentType: any) => contentType === 'json', select: (data: any, path: string) => '' },
      { canHandle: (contentType: any) => contentType === 'json', select: (data: any, path: string) => '' },
    ];
    const sut = new DataSelectorFinder(selectors);

    // when, then
    expect(() => sut.find('json')).to.throw(Error, 'More than one selector supporting json');
  });
});
