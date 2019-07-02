import Request from '@core/domain/request/Request';

export default interface RequestRepositoryPort {
  get(id: string): Promise<Request>;
  exists(id: string): Promise<boolean>;
  save(request: Request): Promise<void>;
  getScheduledRequestsWithValidFromBeforeNow(): Promise<Request[]>;
  getReadyRequests(): Promise<Request[]>;
}
