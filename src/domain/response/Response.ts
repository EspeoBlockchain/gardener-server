import ResponseState from './ResponseState';

class Response {
  requestId: any;
  state: any;
  errorCode: number;
  selectedData: any;

  constructor(requestId) {
    this.requestId = requestId;
    this.state = new ResponseState();
    this.errorCode = 0;
  }

  fetchedData(fetchedData: any, arg1: any, arg2: any) {
    throw new Error('Method not implemented.');
  }

  addFetchedData(fetchedData) {
    if (this.fetchedData) {
      throw new Error('Fetched data already added');
    }
    this.fetchedData = fetchedData;
  }

  addSelectedData(selectedData) {
    if (!this.fetchedData) {
      throw new Error('Cannot add selected data without fetched data');
    }
    if (this.selectedData) {
      throw new Error('Selected data already added');
    }
    this.selectedData = selectedData;
  }

  setError(errorCode) {
    this.errorCode = errorCode;
  }
}

export default Response;
