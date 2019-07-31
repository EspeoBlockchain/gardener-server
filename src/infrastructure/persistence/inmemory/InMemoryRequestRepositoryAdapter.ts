import RequestRepositoryPort from '@core/domain/request/port/RequestRepositoryPort';
import Request from '@core/domain/request/Request';
import { RequestStateEnum } from '@core/domain/request/RequestStateEnum';

class InMemoryRequestRepositoryAdapter implements RequestRepositoryPort {
  private requests: Map<string, Request>;

  constructor() {
    this.requests = new Map();
  }

  get(id: string): Promise<Request> {
    return Promise.resolve(this.requests.get(id));
  }

  exists(id: string): Promise<boolean> {
    return Promise.resolve(this.requests.has(id));
  }

  save(request: Request): Promise<void> {
    this.requests.set(request.id, request);

    return Promise.resolve();
  }

  getScheduledRequestsWithValidFromBeforeNow(): Promise<Request[]> {
    const requests = Array.from(this.requests.values())
      .filter(request => request.state.name === RequestStateEnum.SCHEDULED)
      .filter(request => +request.validFrom <= Date.now());

    return Promise.resolve(requests);
  }

  getReadyRequests(): Promise<Request[]> {
    const requests = Array.from(this.requests.values())
      .filter(request => request.state.name === RequestStateEnum.READY);

    return Promise.resolve(requests);
  }
}

export default InMemoryRequestRepositoryAdapter;
