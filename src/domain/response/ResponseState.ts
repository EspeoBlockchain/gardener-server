import {RequestStateEnum} from '@core/domain/request/RequestStateEnum';
import State from '../common/State';

class ResponseState extends State {
  constructor() {
    super();
    this._setState(RequestStateEnum.PROCESSED, () => true);
  }

  markAsSent() {
    this._setState(RequestStateEnum.SENT, (name: any) => name === RequestStateEnum.PROCESSED);
  }

  markAsFailed() {
    this._setState(RequestStateEnum.FAILED, (name: any) => name === RequestStateEnum.PROCESSED);
  }
}

export default ResponseState;
