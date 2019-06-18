import RequestRepositoryPort from '../../../domain/request/port/RequestRepositoryPort';
import { RequestStateEnum } from '../../../domain/request/RequestStateEnum';

class InMemoryRequestRepositoryAdapter extends RequestRepositoryPort {
  requests: Map<any, any>;
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
      .filter(request => request.state.name ===  RequestStateEnum.SCHEDULED)
      .filter(request => request.validFrom <= Date.now());
  }

  getReadyRequests() {
    return Array.from(this.requests.values())
      .filter(request => request.state.name === RequestStateEnum.READY);
  }
}

export default InMemoryRequestRepositoryAdapter;
