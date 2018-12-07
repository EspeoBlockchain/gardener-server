class FetchNewOracleRequestsUseCase {
  constructor(oracle, logger, startBlockNumber = 0) {
    this.oracle = oracle;
    this.logger = logger;

    this.lastBlock = startBlockNumber - 1;
  }

  async fetchNewRequests(blockNumber) {
    if (blockNumber > this.lastBlock) {
      const nextBlockToPoll = this.lastBlock + 1;
      const requests = await this.oracle.getRequests(nextBlockToPoll, blockNumber);
      this.logger.info(`Fetched requests [requests=${JSON.stringify(requests)},fromBlock=${nextBlockToPoll},toBlock=${blockNumber}]`);
      this.lastBlock = blockNumber;

      return requests;
    }

    return [];
  }
}

module.exports = FetchNewOracleRequestsUseCase;
