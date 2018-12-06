const RequestRepositoryPort = require('../domain/request/port/RequestRepositoryPort');
const RequestStateEnum = require('../domain/request/RequestStateEnum');

class InMemoryRequestRepositoryAdapter extends RequestRepositoryPort {
  constructor() {
    super();
    this.requests = [];
  }

  save(request) {
    this.requests.push(request);
  }

  getScheduledRequestsWithValidFromBeforeNow() {
    return this.requests.filter(
      request => request.state.name === RequestStateEnum.SCHEDULED
        && request.validFrom < Date.now(),
    );
  }
}

module.exports = InMemoryRequestRepositoryAdapter;
