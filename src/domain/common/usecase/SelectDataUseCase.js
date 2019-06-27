const { NoMatchingElementsFoundError, InvalidSelectorDataError } = require('../utils/error');

class SelectDataUseCase {
  constructor(dataSelectorFinder, logger) {
    this.dataSelectorFinder = dataSelectorFinder;
    this.logger = logger;
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

module.exports = SelectDataUseCase;
