const ONE_SECOND_MILLIS = 1000;

class MarkValidRequestsAsReadyScheduler {
  constructor(private markValidRequestsAsReadyUseCase) {}

  schedule() {
    setInterval(
      () => this.markValidRequestsAsReadyUseCase.markValidRequestsAsReady(),
      ONE_SECOND_MILLIS,
    );
  }
}

export default MarkValidRequestsAsReadyScheduler;
