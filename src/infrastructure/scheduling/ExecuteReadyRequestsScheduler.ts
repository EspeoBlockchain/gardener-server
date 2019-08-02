import ExecuteReadyRequestsUseCase from '@core/domain/request/usecase/ExecuteReadyRequestsUseCase';

const TEN_SECONDS_MILLIS = 10 * 1000;

class ExecuteReadyRequestsScheduler {
  constructor(private executeReadyRequestsUseCase: ExecuteReadyRequestsUseCase) { }

  schedule() {
    setInterval(
      () => this.executeReadyRequestsUseCase.executeReadyRequests(),
      TEN_SECONDS_MILLIS,
    );
  }
}

export default ExecuteReadyRequestsScheduler;
