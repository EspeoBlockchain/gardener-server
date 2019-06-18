import State from '../common/State';
import { RequestStateEnum } from './RequestStateEnum'

class RequestState extends State {
  constructor(name = RequestStateEnum.SCHEDULED) {
    super();
    if (![RequestStateEnum.SCHEDULED, RequestStateEnum.READY, RequestStateEnum.PROCESSED, RequestStateEnum.FINISHED, RequestStateEnum.FAILED].includes(name)) {
      throw new Error(`Invalid request state: ${name}`);
    }
    this.name = name;
  }

  markAsScheduled() {
    this._setState(RequestStateEnum.SCHEDULED, name => name === undefined);
  }

  markAsReady() {
    this._setState(RequestStateEnum.READY, name => [undefined, RequestStateEnum.SCHEDULED].includes(name));
  }

  markAsProcessed() {
    this._setState(RequestStateEnum.PROCESSED, name => name === RequestStateEnum.READY);
  }

  markAsFinished() {
    this._setState(RequestStateEnum.FINISHED, name => name === RequestStateEnum.PROCESSED);
  }

  markAsFailed() {
    this._setState(RequestStateEnum.FAILED, name => name === RequestStateEnum.PROCESSED);
  }
}

export default RequestState;
