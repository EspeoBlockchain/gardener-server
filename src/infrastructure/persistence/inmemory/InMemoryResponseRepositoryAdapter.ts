import ResponseRepositoryPort from '../../../domain/response/port/ResponseRepositoryPort';

class InMemoryResponseRepositoryAdapter extends ResponseRepositoryPort {
  constructor() {
    super();
    this.responses = new Map();
  }

  save(response) {
    this.responses.set(response.requestId, response);
  }
}

export default InMemoryResponseRepositoryAdapter;
