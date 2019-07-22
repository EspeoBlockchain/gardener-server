import Request from '@core/domain/request/Request';

export default interface DataFetcherPort {
  fetch(request: Request): Promise<string>;
}
