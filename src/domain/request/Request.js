const RequestStateFactory = require('./RequestStateFactory');

class Request {
  constructor(id, url, validFrom) {
    // TODO param validation?
    this.id = id;
    this.url = url;
    this.validFrom = validFrom;
    this.state = RequestStateFactory.createState(validFrom);
  }
}

module.exports = Request;
