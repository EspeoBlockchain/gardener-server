const TEN_SECONDS_MILLIS = 10 * 1000;

class ExecuteReadyRequestsScheduler {
  constructor(private executeReadyRequestsUseCase) {}

  schedule() {
    setInterval(
      () => this.executeReadyRequestsUseCase.executeReadyRequests(),
      TEN_SECONDS_MILLIS,
    );
  }
}

export default ExecuteReadyRequestsScheduler;
