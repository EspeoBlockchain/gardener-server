import RequestState from './RequestState';
import RequestStateFactory from './RequestStateFactory';
import RequestUrlParser from './RequestUrlParser';

class Request {
  id: string;
  url: string;
  validFrom: number;
  state: RequestState;
  constructor(id, url, validFrom, state?) {
    // TODO param validation?
    this.id = id;
    this.url = url;
    this.validFrom = validFrom;
    this.state = state ? new RequestState(state) : RequestStateFactory.createState(validFrom);
  }

  getRawUrl() {
    return RequestUrlParser.resolveRawUrl(this.url);
  }

  getContentType() {
    return RequestUrlParser.resolveContentType(this.url);
  }

  getSelectionPath() {
    return RequestUrlParser.resolveSelectionPath(this.url);
  }
}

export default Request;
