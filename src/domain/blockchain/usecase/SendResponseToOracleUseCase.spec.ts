import { describe, it } from 'mocha';

import SilentLogger from '@core/application/logger/SilentLoggerAdapter';
import { expect } from '@core/config/configuredChai';

import Response from '@core/domain/response/Response';
import { OracleGateway } from '../port';
import SendResponseToOracleUseCase from './SendResponseToOracleUseCase';

describe('SendResponseUseCase', () => {
  const oracle = () => ({
    sendResponse: () => Promise.resolve(),
  });

  const failingOracle = () => ({
    sendResponse: () => Promise.reject(new Error()),
  });

  it('should send response back to oracle without throwing error', async () => {
    // given
    const response = new Response('id');
    const sut = new SendResponseToOracleUseCase(oracle() as unknown as OracleGateway, new SilentLogger());
    // when, then
    return expect(sut.sendResponse(response)).to.be.fulfilled;
  });

  it('should throw error when sending response failed', async () => {
    // given
    const response = new Response('id');
    const sut = new SendResponseToOracleUseCase(failingOracle() as unknown as OracleGateway, new SilentLogger());
    // when, then
    return expect(() => sut.sendResponse(response)).to.eventually.be.rejected;
  });
});
