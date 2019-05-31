class SelectDataUseCase {
  constructor(dataSelectorFinder, logger) {
    this.dataSelectorFinder = dataSelectorFinder;
    this.logger = logger;
  }

  async selectFromRawData(fetchedData, contentType, path) {
    const selectedData = this.dataSelectorFinder.find(contentType).select(fetchedData, path);
    this.logger.info(`Data selected [selectedData=${selectedData},fetchedData=${fetchedData},contentType=${contentType},path=${path}]`);

    return selectedData;
  }

  async selectFromRandomRawData(fetchedData) {
    const selectedData = this.dataSelectorFinder.find('random').select(fetchedData, '');
    this.logger.info(`Random data selected [selectedData=${selectedData},fetchedData=${fetchedData}]`);

    return selectedData;
  }
}

module.exports = SelectDataUseCase;
