import { expect } from '@core/config/configuredChai';
import { describe, it } from 'mocha';
import {ConsoleLoggerAdapter} from '../../../adapter';
import DataSelectorFinder from '../DataSelectorFinder';
import { InvalidSelectorDataError, NoMatchingElementsFoundError } from '../utils/error';
import SelectDataUseCase from './SelectDataUseCase';

describe('SelectDataUseCase', () => {
  it('should select appropriate data', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.resolve('selectedData') }),
    });
    const sut = new SelectDataUseCase(finder() as unknown as DataSelectorFinder, new ConsoleLoggerAdapter());
    // when
    const selectedData = await sut.selectFromRawData('fetchedData', 'json', '.key1');
    // then
    expect(selectedData).to.equal('selectedData');
  });

  it('should throw NoMatchingElementsFoundError when no data matched', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.resolve(null) }),
    });
    const sut = new SelectDataUseCase(finder() as unknown as DataSelectorFinder, new ConsoleLoggerAdapter());
    // when, then
    return expect(sut.selectFromRawData('fetchedData', 'json', '.key1')).to.be.rejectedWith(NoMatchingElementsFoundError);
  });

  it('should throw InvalidSelectorDataError if selector throw any error', async () => {
    // given
    const finder = () => ({
      find: () => ({ select: () => Promise.reject(new Error('fail')) }),
    });
    const sut = new SelectDataUseCase(finder() as unknown as DataSelectorFinder, new ConsoleLoggerAdapter());
    // when, then
    return expect(sut.selectFromRawData('fetchedData', 'json', '.key1')).to.be.rejectedWith(InvalidSelectorDataError);
  });
});
