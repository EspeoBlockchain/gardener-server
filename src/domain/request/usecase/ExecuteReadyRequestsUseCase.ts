import SendResponseToOracleUseCase from '@core/domain/blockchain/usecase/SendResponseToOracleUseCase';
import { LoggerPort } from '@core/domain/common/port';
import {RequestRepositoryPort} from '@core/domain/request/port';
import RequestExecutorStrategy from '@core/domain/request/requestExecutor/RequestExecutorStrategy';
import ResponseRepositoryPort from '@core/domain/response/port/ResponseRepositoryPort';
import InvalidRequestError from '../../common/utils/error/InvalidRequestError';
import Response from '../../response/Response';

class ExecuteReadyRequestsUseCase {
  constructor(
    private readonly sendResponseToOracleUseCase: SendResponseToOracleUseCase,
    private readonly requestRepository: RequestRepositoryPort,
    private readonly responseRepository: ResponseRepositoryPort,
    private readonly requestExecutorStrategy: RequestExecutorStrategy,
    private readonly logger: LoggerPort,
  ) {
  }

  async executeReadyRequests(): Promise<void> {
    const requests = await this.requestRepository.getReadyRequests();

    const promises = requests.map(async (request) => {
      request.state.markAsProcessed();
      await this.requestRepository.save(request);
      this.logger.info(`Request marked as processed [requestId=${request.id}]`);

      const response = await this.executeRequest(request);
      if (!response) {
        return;
      }

      request.state.markAsFinished();
      await this.requestRepository.save(request);
      this.logger.info(`Request marked as finished [requestId=${request.id}]`);

      await this.sendResponse(response);
      await this.responseRepository.save(response);
    });

    await Promise.all(promises);
  }

  private async executeRequest(request): Promise<Response> {
    try {
      const requestExecutor = this.requestExecutorStrategy.create(request.getContentType());

      return await requestExecutor.execute(request);
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        const response = new Response(request.id);
        response.setError(e.code);
        this.logger.error(`Invalid request. Data was not fetched. [response=${JSON.stringify(response)}]`, e);

        return response;
      }

      request.state.markAsFailed();
      await this.requestRepository.save(request);
      this.logger.error(`Request marked as failed [requestId=${request.id}]`, e);
      return null;
    }
  }

  private async sendResponse(response): Promise<void> {
    try {
      await this.sendResponseToOracleUseCase.sendResponse(response);
      response.state.markAsSent();
      this.logger.info(`Response marked as sent [requestId=${response.requestId}]`);
    } catch (e) {
      this.logger.error(`Sending response failed [requestId=${response.requestId}]`, e);
      response.state.markAsFailed();
      this.logger.info(`Response marked as failed [requestId=${response.requestId}]`);
    }
  }
}

export default ExecuteReadyRequestsUseCase;
