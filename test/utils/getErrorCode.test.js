const { describe, it } = require('mocha');
const { assert } = require('chai');
const getErrorCode = require('../../src/utils/getErrorCode');

describe('getErrorCode', () => {
  it('should return number if code param is integer', () => {
    // given
    const error = new Error();
    error.code = 1000;

    // when
    const errorCode = getErrorCode(error);

    // then
    assert.equal(errorCode, 1000, 'Error code should be 1000');
  });

  it('should return 404 if code param is ENOTFOUND', () => {
    // given
    const error = new Error();
    error.code = 'ENOTFOUND';

    // when
    const errorCode = getErrorCode(error);

    // then
    assert.equal(errorCode, 404, 'Error code should be 404');
  });

  it('should return number from response.status', () => {
    // given
    const error = new Error();
    error.response = { status: 1000 };

    // when
    const errorCode = getErrorCode(error);

    // then
    assert.equal(errorCode, 1000, 'Error code should be 1000');
  });

  it('should throw error if not valid error code found', () => {
    // given
    const error = new Error();

    // when
    assert.throws(() => getErrorCode(error), error);
  });
});
