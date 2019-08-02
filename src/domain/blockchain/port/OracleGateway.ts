import Request from '@core/domain/request/Request';
import Response from '@core/domain/response/Response';

export default interface OracleGateway {
    getRequests(fromBlock: number, toBlock: number): Promise<Request[]>;
    sendResponse(response: Response): Promise<void>;
}
