import { OracleGateway } from '@core/domain/blockchain/port';
import LoggerPort from '@core/domain/common/port/LoggerPort';

class SendResponseToOracleUseCase {
  constructor(
    private readonly oracle: OracleGateway,
    private readonly logger: LoggerPort,
  ) { }

  async sendResponse(response: any): Promise<void> {
    await this.oracle.sendResponse(response);
    this.logger.info(`Response sent to blockchain  [requestId=${response.requestId}]`);
  }
}

export default SendResponseToOracleUseCase;
