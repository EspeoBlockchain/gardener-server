import ResponseRepositoryPort from '@core/domain/response/port/ResponseRepositoryPort';
import Response from '@core/domain/response/Response';

class InMemoryResponseRepositoryAdapter implements ResponseRepositoryPort {
  responses: Map<string, Response>;
  constructor() {
    this.responses = new Map();
  }

  save(response: Response): Promise<void> {
    this.responses.set(response.requestId, response);

    return Promise.resolve();
  }

  get(responseId: string): Promise<Response> {
    return Promise.resolve(this.responses.get(responseId));
  }
}

export default InMemoryResponseRepositoryAdapter;
