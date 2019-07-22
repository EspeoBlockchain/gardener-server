import State from '../common/State';
import { RequestStateEnum } from './RequestStateEnum';

class RequestState extends State {
  constructor(name = RequestStateEnum.SCHEDULED) {
    super();
    if (![
      RequestStateEnum.SCHEDULED,
      RequestStateEnum.READY,
      RequestStateEnum.PROCESSED,
      RequestStateEnum.FINISHED,
      RequestStateEnum.FAILED,
    ].includes(name)) {
      throw new Error(`Invalid request state: ${name}`);
    }
    this.name = name;
  }

  markAsScheduled() {
    this._setState(RequestStateEnum.SCHEDULED, (name: any) => name === undefined);
  }

  markAsReady() {
    this._setState(RequestStateEnum.READY, (name: any) => [undefined, RequestStateEnum.SCHEDULED].includes(name));
  }

  markAsProcessed() {
    this._setState(RequestStateEnum.PROCESSED, (name: any) => name === RequestStateEnum.READY);
  }

  markAsFinished() {
    this._setState(RequestStateEnum.FINISHED, (name: any) => name === RequestStateEnum.PROCESSED);
  }

  markAsFailed() {
    this._setState(RequestStateEnum.FAILED, (name: any) => name === RequestStateEnum.PROCESSED);
  }
}

export default RequestState;
