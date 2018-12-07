class MarkValidRequestsAsReadyUseCase {
  constructor(requestRepository, logger) {
    this.requestRepository = requestRepository;
    this.logger = logger;
  }


  markValidRequestsAsReady() {
    const requests = this.requestRepository.getScheduledRequestsWithValidFromBeforeNow();

    requests.forEach((request) => {
      request.state.markAsReady();
      this.requestRepository.save(request);
      this.logger.info(`Request ${request.id} marked as ready`);
    });
  }
}

module.exports = MarkValidRequestsAsReadyUseCase;
