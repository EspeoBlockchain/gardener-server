import MarkValidRequestsAsReadyUseCase from '@core/domain/request/usecase/MarkValidRequestsAsReadyUseCase';

const ONE_SECOND_MILLIS = 1000;

class MarkValidRequestsAsReadyScheduler {
  constructor(private markValidRequestsAsReadyUseCase: MarkValidRequestsAsReadyUseCase) { }

  schedule() {
    setInterval(
      () => this.markValidRequestsAsReadyUseCase.markValidRequestsAsReady(),
      ONE_SECOND_MILLIS,
    );
  }
}

export default MarkValidRequestsAsReadyScheduler;
