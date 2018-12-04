const ResponseState = require('./ResponseState');

class Response {
  constructor(requestId) {
    this.requestId = requestId;
    this.state = new ResponseState();
  }
}

module.exports = Response;
