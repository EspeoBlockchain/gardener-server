const TEN_SECONDS_MILLIS = 10 * 1000;

class ExecuteReadyRequestsScheduler {
  constructor(executeReadyRequestsUseCase) {
    this.executeReadyRequestsUseCase = executeReadyRequestsUseCase;
  }

  schedule() {
    setInterval(
      () => this.executeReadyRequestsUseCase.executeReadyRequests(),
      TEN_SECONDS_MILLIS,
    );
  }
}

module.exports = ExecuteReadyRequestsScheduler;
