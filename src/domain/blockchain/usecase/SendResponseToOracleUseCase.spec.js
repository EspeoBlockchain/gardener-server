const { describe, it } = require('mocha');
const { expect } = require('chai');
const SendResponseToOracleUseCase = require('./SendResponseToOracleUseCase');
const Response = require('../../response/Response');
const { logger } = require('../../common/utils/TestMocks');

describe('SendResponseUseCase', () => {
  const oracle = () => ({
    sendResponse: () => Promise.resolve(),
  });

  const failingOracle = () => ({
    sendResponse: () => { throw new Error(); },
  });

  it('should send response back to oracle and mark response as sent', async () => {
    // given
    let response = new Response('id');
    const sut = new SendResponseToOracleUseCase(oracle(), logger());
    // when
    response = await sut.sendResponse(response);
    // then
    expect(response.state.name).to.equal('Sent');
  });

  it('should mark response as failed if sending failed', async () => {
    // given
    let response = new Response('id');
    const sut = new SendResponseToOracleUseCase(failingOracle(), logger());
    // when
    response = await sut.sendResponse(response);
    // then
    expect(response.state.name).to.equal('Failed');
  });
});
