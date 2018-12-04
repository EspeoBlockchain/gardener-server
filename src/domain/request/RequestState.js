/* eslint-disable no-underscore-dangle */
const State = require('../State');

const SCHEDULED = 'Scheduled';
const READY = 'Ready';
const PROCESSED = 'Processed';
const FINISHED = 'Finished';
const FAILED = 'Failed';

class RequestState extends State {
  constructor() {
    super();
    this.name = undefined;
  }

  markAsScheduled() {
    this._checkState(name => name === undefined);
    this.name = SCHEDULED;
  }

  markAsReady() {
    this._checkState(name => [undefined, SCHEDULED].includes(name));
    this.name = READY;
  }

  markAsProcessed() {
    this._checkState(name => name === READY);
    this.name = PROCESSED;
  }

  markAsFinished() {
    this._checkState(name => name === PROCESSED);
    this.name = FINISHED;
  }

  markAsFailed() {
    this._checkState(name => name === PROCESSED);
    this.name = FAILED;
  }
}

module.exports = RequestState;
