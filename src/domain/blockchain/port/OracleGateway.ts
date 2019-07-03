import Request from '@core/domain/request/Request';

export default interface OracleGateway {
  getRequests(fromBlock, toBlock): Promise<Request[]>;
  sendResponse(response): Promise<void>;
}
