class MarkValidRequestsAsReadyUseCase {
  constructor(requestRepository, logger) {
    this.requestRepository = requestRepository;
    this.logger = logger;
  }


  markValidRequestsAsReady() {
    const requests = this.requestRepository.getScheduledRequestsWithValidFromBeforeNow();

    requests.forEach((request) => {
      request.state.markAsReady();
      this.logger.info(`Request ${request.id} marked as ready`);
      this.requestRepository.save(request);
    });
  }
}

module.exports = MarkValidRequestsAsReadyUseCase;
