const { describe, it } = require('mocha');
const { expect } = require('chai');
const Request = require('./Request');
const RequestState = require('./RequestState');

describe('Request', () => {
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
