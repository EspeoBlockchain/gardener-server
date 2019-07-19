import SendResponseToOracleUseCase from '@core/domain/blockchain/usecase/SendResponseToOracleUseCase';
import { LoggerPort } from '@core/domain/common/port';
import FetchDataUseCase from '@core/domain/common/usecase/FetchDataUseCase';
import SelectDataUseCase from '@core/domain/common/usecase/SelectDataUseCase';
import {RequestRepositoryPort} from '@core/domain/request/port';
import ResponseRepositoryPort from '@core/domain/response/port/ResponseRepositoryPort';
import InvalidRequestError from '../../common/utils/error/InvalidRequestError';
import Response from '../../response/Response';

class ExecuteReadyRequestsUseCase {
  constructor(
    private readonly fetchDataUseCase: FetchDataUseCase,
    private readonly selectDataUseCase: SelectDataUseCase,
    private readonly sendResponseToOracleUseCase: SendResponseToOracleUseCase,
    private readonly requestRepository: RequestRepositoryPort,
    private readonly responseRepository: ResponseRepositoryPort,
    private readonly logger: LoggerPort,
  ) {
  }

  async executeReadyRequests(): Promise<void> {
    const requests = await this.requestRepository.getReadyRequests();

    const promises = requests.map(async (request) => {
      request.state.markAsProcessed();
      await this.requestRepository.save(request);
      this.logger.info(`Request marked as processed [requestId=${request.id}]`);

      const response = await this.fetchAndSelectData(request);
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

  private async fetchAndSelectData(request): Promise<Response> {
    const response = new Response(request.id);

    try {
      response.addFetchedData(await this.fetchDataUseCase.fetch(request));
      response.addSelectedData(await this.select(response.fetchedData, request));
      this.logger.info(`Fetched and selected data [response=${JSON.stringify(response)}]`);

      return response;
    } catch (e) {
      if (e instanceof InvalidRequestError) {
        response.setError(e.code);
        this.logger.error(`Could not fetch and/or select data [response=${JSON.stringify(response)}]`, e);

        return response;
      }

      request.state.markAsFailed();
      await this.requestRepository.save(request);
      this.logger.error(`Request marked as failed [requestId=${request.id}]`, e);
      return null;
    }
  }

  private async select(fetchedData, request) {
    if (request.getContentType() === 'random') {
      return fetchedData;
    }

    return this.selectDataUseCase.selectFromRawData(
      fetchedData,
      request.getContentType(),
      request.getSelectionPath(),
    );
  }

  private async sendResponse(response) {
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
