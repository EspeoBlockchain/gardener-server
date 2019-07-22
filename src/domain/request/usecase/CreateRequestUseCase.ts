import { LoggerPort } from '@core/domain/common/port';
import { RequestRepositoryPort } from '@core/domain/request/port';
import Request from '../Request';

class CreateRequestUseCase {
  constructor(
    private readonly requestRepository: RequestRepositoryPort,
    private readonly logger: LoggerPort) { }

  async createRequest(id: any, url: any, validFrom: any): Promise<void> {
    if (await this.requestRepository.exists(id)) {
      throw new Error(`Request ${id} already in the system`);
    }

    const request = new Request(id, url, validFrom);
    await this.requestRepository.save(request);
    this.logger.info(`Created request [request=${JSON.stringify(request)}]`);
  }
}

export default CreateRequestUseCase;
