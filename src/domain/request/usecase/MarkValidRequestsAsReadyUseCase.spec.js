/* eslint-disable no-unused-vars */

const { describe, it } = require('mocha');
const { expect } = require('chai');
const Request = require('../Request');
const RequestStateEnum = require('../RequestStateEnum');
const MarkValidRequestsAsReadyUseCase = require('./MarkValidRequestsAsReadyUseCase');
const { logger } = require('../../common/utils/TestMocks');

describe('MarkValidRequestsAsReadyUseCase', () => {
  const repository = () => {
    const requests = [];
    return {
      save: req => requests.push(req),
      list: () => requests,
      getScheduledRequestsWithValidFromBeforeNow: () => requests,
      getById: id => requests[0],
    };
  };

  it('should mark all scheduled responses with validFrom before now as ready', async () => {
    // given
    const requestRepository = repository();
    requestRepository.save(new Request('1', 'url', Date.now(), RequestStateEnum.SCHEDULED));

    const sut = new MarkValidRequestsAsReadyUseCase(requestRepository, logger());

    // when
    await sut.markValidRequestsAsReady();
    // then
    expect(requestRepository.getById('1').state.name).to.equal(RequestStateEnum.READY);
    expect(sut.logger.list().length).to.equal(1);
  });
});
