import RequestState from './RequestState';

class RequestStateFactory {
  static createState(validFrom) {
    const state = new RequestState();
    if (Date.now() >= validFrom) {
      state.markAsReady();
    }

    return state;
  }
}

export default RequestStateFactory;
