class SelectDataUseCase {
  constructor(dataSelectorFinder, requestRepository, responseRepository, logger) {
    this.dataSelectorFinder = dataSelectorFinder;
    this.requestRepository = requestRepository;
    this.responseRepository = responseRepository;
    this.logger = logger;
  }

  async selectFromRawData(response) {
    const request = await this.requestRepository.find(response.requestId);

    const contentType = request.getContentType();
    const path = request.getSelectionPath();
    const selectedData = this._selectData(contentType, path);
    this.logger.info(`
      Data selected: ${selectedData} 
      [fetchedData=${response.fetchedData},contentType=${contentType},path=${path}
     `);

    response.addSelectedData(selectedData);
    response.state.markAsFinished();
    this.responseRepository.save(response);
    this.logger.info(`Response for request ${response.requestId} marked as finished`);
  }

  _selectData(fetchedData, contentType, path) {
    return this.dataSelectorFinder
      .find(contentType)
      .select(fetchedData, path);
  }
}

module.exports = SelectDataUseCase;
