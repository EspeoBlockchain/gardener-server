import { expect } from '@core/config/configuredChai';
import { beforeEach, describe, it } from 'mocha';

import Request from '@core/domain/request/Request';
import InMemoryRequestRepository from './InMemoryRequestRepositoryAdapter';

describe('InMemoryRequestRepositoryAdapter', () => {
  let sut: InMemoryRequestRepository;

  beforeEach(() => {
    sut = new InMemoryRequestRepository();
  });

  it('should return true if element with such id exists in collection', async () => {
    // given
    sut.save(new Request('1', 'url', new Date(), 'Scheduled'));
    // when
    const result: boolean = await sut.exists('1');
    // then
    expect(result).to.equal(true);
  });

  it('should save Request to database', () => {
    // given
    const request = new Request('1', 'url', new Date(), 'Processed');

    // when, then
    return expect(() => sut.save(request)).to.not.throw();
  });

  it('should get scheduled requests with validFrom parameter before now', async () => {
    // given
    const request1 = new Request('1', 'url', new Date(Date.now() - 10000), 'Scheduled');
    const request2 = new Request('2', 'url', new Date(Date.now() + 10000), 'Scheduled');
    await sut.save(request1);
    await sut.save(request2);

    // when
    const results = await sut.getScheduledRequestsWithValidFromBeforeNow();

    // then
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.deep.equal(request1);
  });

  it('should get requests with Ready status', async () => {
    // given
    const request1 = new Request('1', 'url', new Date(), 'Ready');
    const request2 = new Request('2', 'url', new Date(), 'Scheduled');
    await sut.save(request1);
    await sut.save(request2);

    // when
    const results = await sut.getReadyRequests();

    // then
    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.deep.equal(request1);
  });
});
