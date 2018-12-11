/* eslint-disable no-unused-vars */
const { describe, it } = require('mocha');
const { expect } = require('chai');
const CheckHealthStatusUseCase = require('./CheckHealthStatusUseCase');

describe('CheckHealthStatusUseCase', () => {
  it('should return server status as working', async () => {
    // given
    const sut = new CheckHealthStatusUseCase();
    // when
    const { isAlive } = await sut.checkStatus();
    // then
    expect(isAlive).to.equal(true);
  });
});
