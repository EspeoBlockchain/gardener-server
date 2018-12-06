const RequestRepositoryPort = require('../domain/request/port/RequestRepositoryPort');
const RequestStateEnum = require('../domain/request/RequestStateEnum');

class InMemoryRequestRepositoryAdapter extends RequestRepositoryPort {
  constructor() {
    super();
    this.requests = new Map();
  }

  save(request) {
    this.requests.set(request.id, request);
  }

  getScheduledRequestsWithValidFromBeforeNow() {
    return Array.from(this.requests.values()).filter(
      request => request.state.name === RequestStateEnum.SCHEDULED
        && request.validFrom < Date.now(),
    );
  }

  getReadyRequests() {
    return Array.from(this.requests.values())
      .filter(request => request.state.name === RequestStateEnum.READY);
  }
}

module.exports = InMemoryRequestRepositoryAdapter;
