const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));;
const SelectDataUseCase = require('./SelectDataUseCase');
const { Logger } = require('../utils/TestMocks');

describe('SelectDataUseCase', () => {
  it('should select appropriate data', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.resolve('selectedData') }),
    });
    const sut = new SelectDataUseCase(finder(), new Logger());
    // when
    const selectedData = await sut.selectFromRawData('fetchedData', 'json', '.key1');
    // then
    expect(selectedData).to.equal('selectedData');
    expect(sut.logger.list()).to.have.lengthOf(1);
  });

  it('should throw NoMatchingElementsFoundError when no data matched', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.resolve(null) }),
    });
    const sut = new SelectDataUseCase(finder(), new Logger());
    // when, then
    return expect(sut.selectFromRawData('fetchedData', 'json', '.key1')).to.be.rejected;
  });

  it('should throw InvalidSelectorDataError selector throw any error', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.reject() }),
    });
    const sut = new SelectDataUseCase(finder(), new Logger());
    // when, then
    return expect(sut.selectFromRawData('fetchedData', 'json', '.key1')).to.be.rejected;
  });
});
