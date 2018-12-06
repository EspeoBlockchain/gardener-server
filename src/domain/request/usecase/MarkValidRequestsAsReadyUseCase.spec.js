/* eslint-disable no-unused-vars */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Request = require('../Request');
const RequestStateEnum = require('../RequestStateEnum');
const MarkValidRequestsAsReadyUseCase = require('./MarkValidRequestsAsReadyUseCase');

describe('CreateRequestUseCase', () => {
  const repository = () => {
    const requests = [];
    return {
      save: req => requests.push(req),
      list: () => requests,
      getScheduledRequestsWithValidFromBeforeNow: () => requests,
      getById: id => requests[0],
    };
  };

  const logger = () => {
    const logs = [];
    return {
      info: log => logs.push(log),
      list: () => logs,
    };
  };

  it('should mark all scheduled responses with validFrom less than now as ready', () => {
    // given
    const requestRepository = repository();
    requestRepository.save(new Request('1', 'url', Date.now(), RequestStateEnum.SCHEDULED));

    const sut = new MarkValidRequestsAsReadyUseCase(requestRepository, logger());

    // when
    sut.markValidRequestsAsReady();
    // then
    expect(requestRepository.getById('1').state.name).to.equal(RequestStateEnum.READY);
    expect(sut.logger.list().length).to.equal(1);
  });
});
