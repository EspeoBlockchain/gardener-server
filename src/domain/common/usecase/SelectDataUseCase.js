class SelectDataUseCase {
  constructor(dataSelectorFinder, logger) {
    this.dataSelectorFinder = dataSelectorFinder;
    this.logger = logger;
  }

  async selectFromRawData(request, response) {
    const contentType = request.getContentType();
    const path = request.getSelectionPath();
    const selectedData = this._selectData(response.fetchedData, contentType, path);
    this.logger.info(`
    Data selected: ${selectedData} 
    [fetchedData=${response.fetchedData},contentType=${contentType},path=${path}
   `);

    response.addSelectedData(selectedData);

    return response;
  }

  _selectData(fetchedData, contentType, path) {
    return this.dataSelectorFinder
      .find(contentType)
      .select(fetchedData, path);
  }
}

module.exports = SelectDataUseCase;
