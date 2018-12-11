const State = require('../common/State');
const {
  SCHEDULED, READY, PROCESSED, FINISHED, FAILED,
} = require('./RequestStateEnum');

class RequestState extends State {
  constructor(name = SCHEDULED) {
    super();
    if (![SCHEDULED, READY, PROCESSED, FINISHED, FAILED].includes(name)) {
      throw new Error(`Invalid request state: ${name}`);
    }
    this.name = name;
  }

  markAsScheduled() {
    this._setState(SCHEDULED, name => name === undefined);
  }

  markAsReady() {
    this._setState(READY, name => [undefined, SCHEDULED].includes(name));
  }

  markAsProcessed() {
    this._setState(PROCESSED, name => name === READY);
  }

  markAsFinished() {
    this._setState(FINISHED, name => name === PROCESSED);
  }

  markAsFailed() {
    this._setState(FAILED, name => name === PROCESSED);
  }
}

module.exports = RequestState;
