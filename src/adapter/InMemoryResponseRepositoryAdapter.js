const ResponseRepositoryPort = require('../domain/response/port/ResponseRepositoryPort');

class InMemoryResponseRepositoryAdapter extends ResponseRepositoryPort {
  constructor() {
    super();
    this.responses = [];
  }

  save(response) {
    this.responses.push(response);
  }
}

module.exports = InMemoryResponseRepositoryAdapter;
