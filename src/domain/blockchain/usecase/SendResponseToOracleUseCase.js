class SendResponseToOracleUseCase {
  constructor(oracle, logger) {
    this.oracle = oracle;
    this.logger = logger;
  }

  async sendResponse(response) {
    try {
      await this.oracle.sendResponse(response);
      this.logger.info(`Response sent to blockchain  [requestId=${response.requestId}]`);
      response.state.markAsSent();
      this.logger.info(`Response marked as sent [requestId=${response.requestId}]`);
    } catch (e) {
      this.logger.error(`Failed to send response to blockchain [requestId=${response.requestId}]`);
      response.state.markAsFailed();
      this.logger.info(`Response marked as failed [requestId=${response.requestId}]`);
    }

    return response;
  }
}

module.exports = SendResponseToOracleUseCase;
