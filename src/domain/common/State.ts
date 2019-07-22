import { RequestStateEnum } from '@core/domain/request/RequestStateEnum';

class State {
  name: RequestStateEnum;
  _setState(to: any, predicate: any) {
    this._checkState(predicate);
    this.name = to;
  }

  _checkState(predicate: any) {
    if (!predicate(this.name)) {
      // FIXME more user friendly error message
      throw new Error('Illegal state machine transition');
    }
  }
}

export default State;
