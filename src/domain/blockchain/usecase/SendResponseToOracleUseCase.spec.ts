const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const SendResponseToOracleUseCase = require('./SendResponseToOracleUseCase');
const Response = require('../../response/Response');
const { Logger } = require('../../common/utils/TestMocks');

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
    const sut = new SendResponseToOracleUseCase(oracle(), new Logger());
    // when, then
    return expect(sut.sendResponse(response)).to.be.fulfilled;
  });

  it('should throw error when sending response failed', async () => {
    // given
    const response = new Response('id');
    const sut = new SendResponseToOracleUseCase(failingOracle(), new Logger());
    // when, then
    return expect(sut.sendResponse(response)).to.be.rejected;
  });
});
