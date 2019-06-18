import { describe, it } from 'mocha';
const { expect } = require('chai').use(require('chai-as-promised'));
import SelectDataUseCase from './SelectDataUseCase';
import { InvalidSelectorDataError, NoMatchingElementsFoundError } from '../utils/error';
import { Logger } from '../utils/TestMocks';

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
    return expect(sut.selectFromRawData('fetchedData', 'json', '.key1')).to.be.rejectedWith(NoMatchingElementsFoundError);
  });

  it('should throw InvalidSelectorDataError if selector throw any error', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.reject(new Error('fail')) }),
    });
    const sut = new SelectDataUseCase(finder(), new Logger());
    // when, then
    return expect(sut.selectFromRawData('fetchedData', 'json', '.key1')).to.be.rejectedWith(InvalidSelectorDataError);
  });
});
