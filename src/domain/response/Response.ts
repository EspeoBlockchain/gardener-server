import State from '@core/domain/common/State';

import ResponseState from './ResponseState';

class Response {
  requestId: string;
  state: State;
  errorCode: number;
  selectedData: string;
  fetchedData: string;

  constructor(requestId: string) {
    this.requestId = requestId;
    this.state = new ResponseState();
    this.errorCode = 0;
  }

  addFetchedData(fetchedData: string) {
    if (this.fetchedData) {
      throw new Error('Fetched data already added');
    }
    this.fetchedData = fetchedData;
  }

  addSelectedData(selectedData: string) {
    if (!this.fetchedData) {
      throw new Error('Cannot add selected data without fetched data');
    }
    if (this.selectedData) {
      throw new Error('Selected data already added');
    }
    this.selectedData = selectedData;
  }

  setError(errorCode: number) {
    this.errorCode = errorCode;
  }
}

export default Response;
