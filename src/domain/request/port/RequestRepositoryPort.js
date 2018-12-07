/* eslint-disable class-methods-use-this, no-unused-vars */

class RequestRepositoryPort {
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
