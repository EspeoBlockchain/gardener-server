import Request from '@core/domain/request/Request';

export default interface OracleGateway {
    getRequests(fromBlock: any, toBlock: any): Promise<Request[]>;
    sendResponse(response: any): Promise<void>;
}
