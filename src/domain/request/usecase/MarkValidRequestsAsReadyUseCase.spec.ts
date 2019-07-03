import { expect } from 'chai';
import { describe, it } from 'mocha';
import SilentLoggerAdapter from '../../../application/logger/SilentLoggerAdapter';
import {RequestRepositoryPort} from '../port';
import Request from '../Request';
import { RequestStateEnum } from '../RequestStateEnum';
import MarkValidRequestsAsReadyUseCase from './MarkValidRequestsAsReadyUseCase';

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

    const sut = new MarkValidRequestsAsReadyUseCase(requestRepository as unknown as RequestRepositoryPort, new SilentLoggerAdapter());

    // when
    await sut.markValidRequestsAsReady();
    // then
    expect(requestRepository.getById('1').state.name).to.equal(RequestStateEnum.READY);
  });
});
