/* eslint-disable no-unused-vars */
import { describe, it } from 'mocha';
import { expect } from 'chai';
import CheckHealthStatusUseCase from './CheckHealthStatusUseCase';

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
