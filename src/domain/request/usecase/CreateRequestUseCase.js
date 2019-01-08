const Request = require('../Request');

class CreateRequestUseCase {
  constructor(requestRepository, logger) {
    this.requestRepository = requestRepository;
    this.logger = logger;
  }

  async createRequest(id, url, validFrom) {
    if (await this.requestRepository.exists(id)) {
      throw new Error(`Request ${id} already in the system`);
    }

    const request = new Request(id, url, validFrom);
    await this.requestRepository.save(request);
    this.logger.info(`Created request [request=${JSON.stringify(request)}]`);
  }
}

module.exports = CreateRequestUseCase;
