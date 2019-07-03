const RequestStateFactory = require('./RequestStateFactory');
const RequestUrlParser = require('./RequestUrlParser');
const RequestState = require('./RequestState');

class Request {
  constructor(id, url, validFrom, state) {
    // TODO param validation?
    this.id = id;
    this.url = url;
    this.validFrom = validFrom;
    this.state = state ? new RequestState(state) : RequestStateFactory.createState(validFrom);
  }

  getContentType() {
    return RequestUrlParser.resolveContentType(this.url);
  }

  getSelectionPath() {
    return RequestUrlParser.resolveSelectionPath(this.url);
  }
}

module.exports = Request;
