/* eslint-disable no-unused-expressions,array-callback-return */
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
require('sinon-mongoose');

const RequestSchema = require('../../src/model/requestSchema');
const RequestDao = require('../../src/model/RequestDao');

describe('RequestDao', () => {
  it('should return all requests', (done) => {
    // given
    const RequestMock = sinon.mock(RequestSchema);
    const expected = { status: true, request: [] };

    // when
    RequestMock.expects('find').yields(null, expected);

    // then
    RequestSchema.find((err, result) => {
      RequestMock.verify();
      RequestMock.restore();
      expect(err).to.not.exist;
      expect(result).to.equal(expected);
      expect(result.status).to.be.true;
      done();
    });
  });

  it('should return empty url', (done) => {
    // given
    const RequestMock = sinon.mock(RequestSchema);
    const expected = '';

    // when
    RequestMock.expects('find').yields(null, expected);

    // then
    const url = new RequestDao().findSingleRequestUrlByEndDate(new Date());
    expect(url).to.equal(expected);
    RequestMock.verify();
    RequestMock.restore();
    done();
  });

  it('should save request and return url', (done) => {
    // given
    const RequestMock = sinon.mock(RequestSchema);
    const requestDao = new RequestDao();
    const url = 'https://abc.def';
    const date = new Date();
    const expectedFind = { status: true, request: [{ url, ended: date }] };

    // when
    RequestMock.expects('find').yields(null, expectedFind);

    // then
    requestDao.saveRequest(url, new Date());
    const result = requestDao.findSingleRequestUrlByEndDate(new Date());
    expect(url).to.equal(result);
    RequestMock.verify();
    RequestMock.restore();
    done();
  });
});
