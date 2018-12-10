const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const FetchNewOracleRequestsUseCase = require('./FetchNewOracleRequestsUseCase');
const { logger } = require('../../common/utils/TestMocks');

describe('FetchNewOracleRequestUseCase', () => {
  const oracle = () => ({
    // eslint-disable-next-line no-unused-vars
    getRequests: (fromBlock, toBlock) => Promise.resolve([{ id: 'abc', url: 'abc', validFrom: Date.now() }]),
  });

  let sut;

  beforeEach(() => {
    // given
    sut = new FetchNewOracleRequestsUseCase(oracle(), logger(), 1);
  });

  it('should fetch new oracle responses', async () => {
    // when
    const requests = await sut.fetchNewRequests(4);
    // then
    expect(requests).to.be.an.instanceof(Array);
    expect(requests).to.have.lengthOf(1);
    expect(sut.lastBlock).to.equal(4);
    expect(sut.logger.list().length).to.equal(1);
  });

  it('should return empty array if new block is equal current one', async () => {
    // when
    const requests = await sut.fetchNewRequests(0);
    // then
    expect(requests).to.be.an.instanceof(Array);
    expect(requests).to.have.lengthOf(0);
  });
});
