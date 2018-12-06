const TEN_SECOND_MILLIS = 10 * 1000;

class ExecuteReadyRequestsScheduler {
  constructor(executeReadyRequestsUseCase) {
    this.executeReadyRequestsUseCase = executeReadyRequestsUseCase;
  }

  schedule() {
    setInterval(
      () => this.executeReadyRequestsUseCase.executeReadyRequests(),
      TEN_SECOND_MILLIS,
    );
  }
}

module.exports = ExecuteReadyRequestsScheduler;
