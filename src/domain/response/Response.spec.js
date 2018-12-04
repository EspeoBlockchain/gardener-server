const { describe, it } = require('mocha');
const { expect } = require('chai');
const Response = require('./Response');

describe('Response', () => {
  it('should be created in Processed state for given requestId', () => {
    // given
    const requestId = 'qwerty12345';
    // when
    const response = new Response(requestId);
    // then
    expect(response.requestId).to.equal(requestId);
    expect(response.state.name).to.equal('Processed');
  });
});
