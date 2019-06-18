import RequestRepositoryPort from '../../../domain/request/port/RequestRepositoryPort';
import { SCHEDULED, READY } from '../../../domain/request/RequestStateEnum';

class InMemoryRequestRepositoryAdapter extends RequestRepositoryPort {
  constructor() {
    super();
    this.requests = new Map();
  }

  exists(id) {
    return this.requests.has(id);
  }

  save(request) {
    this.requests.set(request.id, request);
  }

  getScheduledRequestsWithValidFromBeforeNow() {
    return Array.from(this.requests.values())
      .filter(request => request.state.name === SCHEDULED)
      .filter(request => request.validFrom <= Date.now());
  }

  getReadyRequests() {
    return Array.from(this.requests.values())
      .filter(request => request.state.name === READY);
  }
}

export default InMemoryRequestRepositoryAdapter;
