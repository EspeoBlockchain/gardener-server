class FetchNewOracleRequestsUseCase {
  constructor(oracle, logger) {
    this.oracle = oracle;
    this.logger = logger;

    this.lastBlock = 0;
  }

  async fetchNewRequests(blockNumber) {
    if (blockNumber > this.lastBlock) {
      const requests = await this.oracle.getRequests(lastBlock, blockNumber);
      this.logger.info(`Fetched requests [requests=${JSON.stringify(requests)},fromBlock=${this.lastBlock},toBlock=${blockNumber}]`);
      if (requests.length > 0) {
        return requests;
      }

      this.lastBlock = blockNumber;
    }

    return [];
  }
}

module.exports = FetchNewOracleRequestsUseCase;
