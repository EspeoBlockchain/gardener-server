import { RequestStateEnum } from '@core/domain/request/RequestStateEnum';

class State {
  name: RequestStateEnum;
  _setState(to: RequestStateEnum, predicate: (param: RequestStateEnum) => boolean) {
    this._checkState(predicate);
    this.name = to;
  }

  _checkState(predicate: (param: RequestStateEnum) => boolean) {
    if (!predicate(this.name)) {
      // FIXME more user friendly error message
      throw new Error('Illegal state machine transition');
    }
  }
}

export default State;
