/* eslint-disable class-methods-use-this, no-unused-vars */

class RequestRepositoryPort {
  getById(id) {
    throw new Error('Not implemented');
  }

  save(request) {
    throw new Error('Not implemented');
  }

  getScheduledRequestsWithValidFromBeforeNow() {
    throw new Error('Not implemented');
  }

  getReadyRequests() {
    throw new Error('Not implemented');
  }
}

module.exports = RequestRepositoryPort;
