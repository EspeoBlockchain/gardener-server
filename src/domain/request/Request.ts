import RequestState from './RequestState';
import RequestStateFactory from './RequestStateFactory';
import RequestUrlParser from './RequestUrlParser';

class Request {
    state: RequestState;
    constructor(public id: string, public url: string, public validFrom: number | Date, state?: any) {
        // TODO param validation?
        this.state = state ? new RequestState(state) : RequestStateFactory.createState(validFrom);
    }

  getContentType() {
    return RequestUrlParser.resolveContentType(this.url);
  }

    getSelectionPath() {
        return RequestUrlParser.resolveSelectionPath(this.url);
    }
}

export default Request;
