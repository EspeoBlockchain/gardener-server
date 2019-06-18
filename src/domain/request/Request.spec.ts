import { describe, it } from 'mocha';
import { expect } from 'chai';
import Request from './Request';
import RequestState from './RequestState';

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
