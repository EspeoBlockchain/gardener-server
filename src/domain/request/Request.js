const RequestStateFactory = require('./RequestStateFactory');
const RequestUrlParser = require('./RequestUrlParserService');
const RequestState = require('./RequestState');

class Request {
  constructor(id, url, validFrom, state) {
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

module.exports = Request;
