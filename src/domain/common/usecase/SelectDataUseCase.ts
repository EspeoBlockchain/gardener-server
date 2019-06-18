import { NoMatchingElementsFoundError, InvalidSelectorDataError } from '../utils/error';

class SelectDataUseCase {
  constructor(private dataSelectorFinder, public logger) {
  }

  async selectFromRawData(fetchedData, contentType, path) {
    let selectedData;

    try {
      selectedData = await this.dataSelectorFinder.find(contentType).select(fetchedData, path);
    } catch (e) {
      throw new InvalidSelectorDataError(e.toString());
    }


    if (selectedData === null) {
      throw new NoMatchingElementsFoundError('No matched elements');
    }

    this.logger.info(`Data selected [selectedData=${selectedData},fetchedData=${fetchedData},contentType=${contentType},path=${path}`);

    return selectedData;
  }
}

export default SelectDataUseCase;
