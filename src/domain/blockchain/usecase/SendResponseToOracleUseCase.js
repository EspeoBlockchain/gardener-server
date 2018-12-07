class SendResponseToOracleUseCase {
  constructor(oracle, logger) {
    this.oracle = oracle;
    this.logger = logger;
  }

  async sendResponse(response) {
    try {
      await this.oracle.sendResponse(response);
      this.logger.info(`Response for request ${response.requestId} sent to blockchain`);
      response.state.markAsSent();
      this.logger.info(`Response for request ${response.requestId} marked as sent`);
    } catch (e) {
      this.logger.error(`Cannot send response for request ${response.requestId} to blockchain`);
      response.state.markAsFailed();
      this.logger.info(`Response for request ${response.requestId} marked as failed`);
    }

    return response;
  }
}

module.exports = SendResponseToOracleUseCase;
