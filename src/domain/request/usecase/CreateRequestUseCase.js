const Request = require('../Request');

class CreateRequestUseCase {
  constructor(requestRepository, logger) {
    this.requestRepository = requestRepository;
    this.logger = logger;
  }

  createRequest(id, url, validFrom) {
    const request = new Request(id, url, validFrom);
    this.requestRepository.save(request);
    this.logger.info(`Created request [request=${JSON.stringify(request)}]`);
  }
}

module.exports = CreateRequestUseCase;
