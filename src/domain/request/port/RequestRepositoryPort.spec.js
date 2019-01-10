const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const RequestRepositoryPort = require('./RequestRepositoryPort');

describe('RequestRepositoryPort', () => {
  let sut;

  beforeEach(() => {
    sut = new RequestRepositoryPort();
  });

  it('should have exists methods, which throw an error', () => {
    // when, then
    expect(sut.exists('1')).to.throw();
  });

  it('should save given parameters and have a state', () => {
    // given
    const requestId = 'qwerty12345';
    const url = 'asdfg67890';
    const validFrom = Date.now();
    // when
    const request = new Request(requestId, url, validFrom);
    // then
    expect(request.id).to.equal(requestId);
    expect(request.url).to.equal(url);
    expect(request.validFrom).to.equal(validFrom);
    expect(request.state).to.be.instanceof(RequestState);
  });
});
