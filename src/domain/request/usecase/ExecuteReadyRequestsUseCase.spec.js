const { describe, it } = require('mocha');
const { expect } = require('chai');
const ExecuteReadyRequestsUseCase = require('./ExecuteReadyRequestsUseCase');
const Request = require('../Request');

describe('CreateRequestUseCase', () => {
  const oneMinuteMillis = 60 * 1000;

  const repository = () => ({
    getRequestsWithValidFromBeforeNow: () => [new Request('123', '123', Date.now() - oneMinuteMillis)],
  });

  const logger = () => {
    const logs = [];
    return {
      info: log => logs.push(log),
      list: () => logs,
    };
  };

  it('should return request ready to execute marked as process', async () => {
    // given
    const sut = new ExecuteReadyRequestsUseCase(repository(), logger());
    // when
    const requests = await sut.executeReadyRequests();
    // then
    expect(requests).to.have.lengthOf(1);
    expect(requests[0].state.name).to.equal('Processed');
    expect(sut.logger.list()).to.have.lengthOf(1);
  });
});
