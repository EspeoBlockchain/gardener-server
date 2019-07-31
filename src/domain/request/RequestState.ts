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
    this.setState(RequestStateEnum.SCHEDULED, (name: any) => name === undefined);
  }

  markAsReady() {
    this.setState(RequestStateEnum.READY, (name: any) => [undefined, RequestStateEnum.SCHEDULED].includes(name));
  }

  markAsProcessed() {
    this.setState(RequestStateEnum.PROCESSED, (name: any) => name === RequestStateEnum.READY);
  }

  markAsFinished() {
    this.setState(RequestStateEnum.FINISHED, (name: any) => name === RequestStateEnum.PROCESSED);
  }

  markAsFailed() {
    this.setState(RequestStateEnum.FAILED, (name: any) => name === RequestStateEnum.PROCESSED);
  }
}

export default RequestState;
