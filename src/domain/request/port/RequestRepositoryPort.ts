/* eslint-disable  no-unused-vars */

class RequestRepositoryPort {
  exists(id) {
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

export default RequestRepositoryPort;
