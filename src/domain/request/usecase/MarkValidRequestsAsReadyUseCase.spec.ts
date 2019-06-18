/* eslint-disable no-unused-vars */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import Request from '../Request';
import RequestStateEnum from '../RequestStateEnum';
import MarkValidRequestsAsReadyUseCase from './MarkValidRequestsAsReadyUseCase';
import { Logger } from '../../common/utils/TestMocks';

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

    const sut = new MarkValidRequestsAsReadyUseCase(requestRepository, new Logger());

    // when
    await sut.markValidRequestsAsReady();
    // then
    expect(requestRepository.getById('1').state.name).to.equal(RequestStateEnum.READY);
    expect(sut.logger.list().length).to.equal(1);
  });
});
