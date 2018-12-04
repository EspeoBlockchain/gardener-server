const State = require('../State');

const PROCESSED = 'Processed';
const SENT = 'Sent';
const FAILED = 'Failed';

class ResponseState extends State {
  constructor() {
    super();
    this._setState(PROCESSED, name => name === undefined);
  }

  markAsSent() {
    this._setState(SENT, name => name === PROCESSED);
  }

  markAsFailed() {
    this._setState(FAILED, name => name === PROCESSED);
  }
}

module.exports = ResponseState;
