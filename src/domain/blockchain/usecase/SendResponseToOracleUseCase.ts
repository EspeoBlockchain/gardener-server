class SendResponseToOracleUseCase {
  oracle: any;
  logger: any;
  constructor(oracle, logger) {
    this.oracle = oracle;
    this.logger = logger;
  }

  async sendResponse(response) {
    await this.oracle.sendResponse(response);
    this.logger.info(`Response sent to blockchain  [requestId=${response.requestId}]`);
  }
}

export default SendResponseToOracleUseCase;
