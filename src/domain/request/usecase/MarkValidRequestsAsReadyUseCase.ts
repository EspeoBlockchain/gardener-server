class MarkValidRequestsAsReadyUseCase {
  constructor(requestRepository, logger) {
    this.requestRepository = requestRepository;
    this.logger = logger;
  }


  async markValidRequestsAsReady() {
    const requests = await this.requestRepository.getScheduledRequestsWithValidFromBeforeNow();

    requests.forEach((request) => {
      request.state.markAsReady();
      this.requestRepository.save(request);
      this.logger.info(`Request marked as ready [requestId=${request.id}]`);
    });
  }
}

export default MarkValidRequestsAsReadyUseCase;
