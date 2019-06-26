import {LoggerPort} from '@core/domain/common/port';
import {RequestRepositoryPort} from '@core/domain/request/port';

class MarkValidRequestsAsReadyUseCase {
  constructor(
    private readonly requestRepository: RequestRepositoryPort,
    private readonly logger: LoggerPort,
  ) {}

  async markValidRequestsAsReady(): Promise<void> {
    const requests = await this.requestRepository.getScheduledRequestsWithValidFromBeforeNow();

    requests.forEach((request) => {
      request.state.markAsReady();
      this.requestRepository.save(request);
      this.logger.info(`Request marked as ready [requestId=${request.id}]`);
    });
  }
}

export default MarkValidRequestsAsReadyUseCase;
