class FetchNewOracleRequestsUseCase {
  constructor(oracle, logger) {
    this.oracle = oracle;
    this.logger = logger;

    this.lastBlock = 0;
  }

  async fetchNewRequests(blockNumber) {
    if (blockNumber > this.lastBlock) {
      const requests = await this.oracle.getRequests(this.lastBlock, blockNumber);
      this.logger.info(`Fetched requests [requests=${JSON.stringify(requests)},fromBlock=${this.lastBlock},toBlock=${blockNumber}]`);
      this.lastBlock = blockNumber;

      return requests;
    }

    return [];
  }
}

module.exports = FetchNewOracleRequestsUseCase;
