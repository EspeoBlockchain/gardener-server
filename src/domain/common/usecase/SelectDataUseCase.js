class SelectDataUseCase {
  constructor(dataSelectorFinder, logger) {
    this.dataSelectorFinder = dataSelectorFinder;
    this.logger = logger;
  }

  async selectFromRawData(fetchedData, contentType, path) {
    const selectedData = this.dataSelectorFinder.find(contentType).select(fetchedData, path);
    this.logger.info(`Data selected [selectedData=${selectedData},fetchedData=${fetchedData},contentType=${contentType},path=${path}`);

    return selectedData;
  }
}

module.exports = SelectDataUseCase;
