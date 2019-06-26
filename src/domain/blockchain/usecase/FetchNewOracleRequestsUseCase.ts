import {OracleGateway} from '@core/domain/blockchain/port';
import LoggerPort from '@core/domain/common/port/LoggerPort';
import Request from '@core/domain/request/Request';

class FetchNewOracleRequestsUseCase {
  private lastBlock: number;

  constructor(
    private readonly oracle: OracleGateway,
    private readonly logger: LoggerPort,
    startBlockNumber: number,
  ) {
    this.lastBlock = startBlockNumber - 1;
  }

  async fetchNewRequests(blockNumber): Promise<Request[]> {
    if (blockNumber <= this.lastBlock) {
      return [];
    }

    const nextBlockToPoll = this.lastBlock + 1;
    const requests = await this.oracle.getRequests(nextBlockToPoll, blockNumber);
    this.logger.info(`Fetched requests [requests=${JSON.stringify(requests)},fromBlock=${nextBlockToPoll},toBlock=${blockNumber}]`);
    this.lastBlock = blockNumber;

    return requests;
  }
}

export default FetchNewOracleRequestsUseCase;
