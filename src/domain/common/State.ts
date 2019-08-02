import { RequestStateEnum } from '@core/domain/request/RequestStateEnum';

class State {
  name: RequestStateEnum;
  protected setState(to: RequestStateEnum, predicate: (param: RequestStateEnum) => boolean) {
    this.checkState(predicate);
    this.name = to;
  }

  protected checkState(predicate: (param: RequestStateEnum) => boolean) {
    if (!predicate(this.name)) {
      // FIXME more user friendly error message
      throw new Error('Illegal state machine transition');
    }
  }
}

export default State;
