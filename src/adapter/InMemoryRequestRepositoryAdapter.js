const RequestRepositoryPort = require('../domain/request/port/RequestRepositoryPort');

class InMemoryRequestRepositoryAdapter extends RequestRepositoryPort {
  constructor() {
    super();
    this.requests = [];
  }

  save(request) {
    this.requests.push(request);
  }
}

module.exports = InMemoryRequestRepositoryAdapter;
