import SilentLogger from '@core/application/logger/SilentLoggerAdapter';
import { expect } from 'chai';
import { beforeEach, describe, it } from 'mocha';
import {OracleGateway} from '../port';
import FetchNewOracleRequestsUseCase from './FetchNewOracleRequestsUseCase';

describe('FetchNewOracleRequestUseCase', () => {
  const oracle = () => ({
    getRequests: (fromBlock, toBlock) => Promise.resolve([{ id: 'abc', url: 'abc', validFrom: Date.now() }]),
  });

  let sut;

  beforeEach(() => {
    // given
    sut = new FetchNewOracleRequestsUseCase(oracle() as OracleGateway, new SilentLogger(), 1);
  });

  it('should fetch new oracle responses', async () => {
    // when
    const requests = await sut.fetchNewRequests(4);
    // then
    expect(requests).to.be.an.instanceof(Array);
    expect(requests).to.have.lengthOf(1);
    expect(sut.lastBlock).to.equal(4);
  });

  it('should return empty array if new block is equal to current one', async () => {
    // when
    const requests = await sut.fetchNewRequests(0);
    // then
    expect(requests).to.be.an.instanceof(Array);
    expect(requests).to.have.lengthOf(0);
  });
});
