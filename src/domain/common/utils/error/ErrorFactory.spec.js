const { describe, it } = require('mocha');
const { expect } = require('chai');
const ErrorFactory = require('./ErrorFactory');

describe('ErrorFactory', () => {
  it('should create error with message and errorCode', async () => {
    // given
    const message = 'message';
    const code = 1000;
    // when
    const error = ErrorFactory.create(message, code);
    // then
    expect(error).to.be.instanceOf(Error);
    expect(error.message).to.equal('message');
    expect(error.code).to.equal(1000);
  });
});
