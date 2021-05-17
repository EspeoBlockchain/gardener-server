import { expect } from '@core/config/configuredChai';
import { assert } from '@core/config/configuredChai';
import { beforeEach, describe, it } from 'mocha';

import InvalidContentTypeError from '@core/domain/common/utils/error/InvalidContentTypeError';
import RandomRequestExecutor from './RandomRequestExecutor';
import RequestExecutorStrategy from './RequestExecutorStrategy';
import UrlRequestExecutor from './UrlRequestExecutor';

describe('RequestExecutorStrategy', () => {
  let sut: RequestExecutorStrategy;

  beforeEach(() => {
    sut = new RequestExecutorStrategy(null, null, null, null, null, null);
  });

  it('should create UrlRequestExecutor for json', () => {
    // given
    const contentType = 'ipfs';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should create UrlRequestExecutor for xml', () => {
    // given
    const contentType = 'xml';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should create UrlRequestExecutor for html', () => {
    // given
    const contentType = 'html';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should create RandomRequestExecutor for random', () => {
    // given
    const contentType = 'random';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, RandomRequestExecutor, 'Incorrect request executor type');
  });

  it('should create UrlRequestExecutor for ipfs', () => {
    // given
    const contentType = 'ipfs';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should throw InvalidContentTypeError for unknown contentType', () => {
    // given
    const contentType = 'some-unknown-content-type';
    // when
    // then
    expect(sut.create.bind(sut, contentType)).to.throw(InvalidContentTypeError, `${contentType} is not a valid content type`);
  });
});
