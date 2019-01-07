const { describe, it } = require('mocha');
const { expect } = require('chai').use(require('chai-as-promised'));
const CreateRequestUseCase = require('./CreateRequestUseCase');
const { logger, repository } = require('../../common/utils/TestMocks');

describe('CreateRequestUseCase', () => {
  it('should save request in the repository and log message', async () => {
    // given
    const id = '123';
    const url = 'qwerty';
    const validFrom = Date.now();
    const sut = new CreateRequestUseCase(repository(), logger());
    // when
    await sut.createRequest(id, url, validFrom);
    // then
    expect(sut.requestRepository.list()[0].id).to.equal(id);
    expect(sut.logger.list().length).to.equal(1);
  });

  it('should throw error if the same request is passing twice', async () => {
    // given
    const id = '123';
    const url = 'qwerty';
    const validFrom = Date.now();
    const sut = new CreateRequestUseCase(repository(), logger());
    await sut.createRequest(id, url, validFrom);
    // when, then
    return expect(sut.createRequest(id, url, validFrom)).to.be.rejected;
  });
});
