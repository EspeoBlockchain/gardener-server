import { beforeEach, describe, it } from 'mocha';
const { expect } = require('chai').use(require('dirty-chai'));
const { assert } = require('chai');

import InvalidContentTypeError from '../../common/utils/error/InvalidContentTypeError';
import RequestExecutorFactory from './RequestExecutorFactory';
import UrlRequestExecutor from './UrlRequestExecutor';

describe('RequestExecutorFactory', () => {
  let sut;

  beforeEach(() => {
    sut = new RequestExecutorFactory(null, null, null);
  });

  it('should create UrlProvider for json', () => {
    // given
    const contentType = 'ipfs';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should create UrlProvider for xml', () => {
    // given
    const contentType = 'xml';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should create UrlProvider for html', () => {
    // given
    const contentType = 'html';
    // when
    const result = sut.create(contentType);
    // then
    assert.instanceOf(result, UrlRequestExecutor, 'Incorrect request executor type');
  });

  it('should create UrlProvider for ipfs', () => {
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
