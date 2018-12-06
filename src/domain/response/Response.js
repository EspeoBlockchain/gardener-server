const ResponseState = require('./ResponseState');

class Response {
  constructor(requestId) {
    this.requestId = requestId;
    this.state = new ResponseState();
  }

  addFetchedData(fetchedData) {
    if (this.fetchedData) {
      throw new Error('Fetched data already added');
    }
    this.fetchedData = fetchedData;
  }

  addSelectedData(selectedData) {
    if (!this.fetchedData) {
      throw new Error('Cannot add selected data when fetched data not added');
    }
    if (this.selectedData) {
      throw new Error('Selected data already added');
    }
    this.selectedData = selectedData;
  }
}

module.exports = Response;
