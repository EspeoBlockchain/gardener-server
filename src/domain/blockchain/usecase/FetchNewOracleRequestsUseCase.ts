class FetchNewOracleRequestsUseCase {
  constructor(oracle, logger, startBlockNumber) {
    this.oracle = oracle;
    this.logger = logger;

    this.lastBlock = startBlockNumber - 1;
  }

  async fetchNewRequests(blockNumber) {
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
