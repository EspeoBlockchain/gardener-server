class SendResponseToOracleUseCase {
  constructor(oracle, logger) {
    this.oracle = oracle;
    this.logger = logger;
  }

  async sendResponse(response) {
    try {
      await this.oracle.sendResponse(response);
      this.logger.info(`Response sent to blockchain  [requestId=${response.requestId}]`);
    } catch (e) {
      this.logger.error(`Failed to send response to blockchain [requestId=${response.requestId}]`);
      throw e;
    }
  }
}

module.exports = SendResponseToOracleUseCase;
