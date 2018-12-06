class MarkValidRequestsAsReadyUseCase {
  constructor(requestRepository) {
    this.requestRepository = requestRepository;
  }


  markValidRequestsAsReady() {
    const requests = this.requestRepository.getScheduledRequests
  }
}

module.exports = MarkValidRequestsAsReadyUseCase;
