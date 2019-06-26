import Request from '@core/domain/request/Request';

export default interface RequestRepositoryPort {
  get(id): Promise<Request>;
  exists(id): Promise<boolean>;
  save(request): Promise<void>;
  getScheduledRequestsWithValidFromBeforeNow(): Promise<Request[]>;
  getReadyRequests(): Promise<Request[]>;
}
