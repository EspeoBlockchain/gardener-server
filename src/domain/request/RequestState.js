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
