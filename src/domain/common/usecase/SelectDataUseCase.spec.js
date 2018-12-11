const { describe, it } = require('mocha');
const { expect } = require('chai');
const SelectDataUseCase = require('./SelectDataUseCase');
const { logger } = require('../utils/TestMocks');

describe('SelectDataUseCase', () => {
  const finder = () => ({
    find: () => ({ select: () => Promise.resolve('selectedData') }),
  });

  it('should select appropriate data', async () => {
    // given
    const sut = new SelectDataUseCase(finder(), logger());
    // when
    const selectedData = await sut.selectFromRawData('fetchedData', 'json', '.key1');
    // then
    expect(selectedData).to.equal('selectedData');
    expect(sut.logger.list()).to.have.lengthOf(1);
  });
});
