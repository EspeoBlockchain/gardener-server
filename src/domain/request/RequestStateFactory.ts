import RequestState from './RequestState';

class RequestStateFactory {
  static createState(validFrom: any) {
    const state = new RequestState();
    if (Date.now() >= validFrom) {
      state.markAsReady();
    }

    return state;
  }
}

export default RequestStateFactory;
