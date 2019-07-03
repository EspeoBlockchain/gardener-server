import { expect } from 'chai';
import { describe, it } from 'mocha';
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
