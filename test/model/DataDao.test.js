/* eslint-disable no-unused-expressions,array-callback-return */
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { expect } = require('chai');
require('sinon-mongoose');

const DataSchema = require('../../src/model/dataSchema');
const DataDao = require('../../src/model/DataDao');

describe('DataDao', () => {
  it('should return all data', (done) => {
    // given
    const DataMock = sinon.mock(DataSchema);
    const expected = { status: true, request: [] };

    // when
    DataMock.expects('find').yields(null, expected);

    // then
    DataSchema.find((err, result) => {
      DataMock.verify();
      DataMock.restore();
      expect(err).to.not.exist;
      expect(result).to.equal(expected);
      expect(result.status).to.be.true;
      done();
    });
  });

  it('should return expected data', (done) => {
    // given
    const DataMock = sinon.mock(DataSchema);
    const valueExpected = 'some data';
    const expected = { status: true, data: [{ value: `${valueExpected}` }] };

    // when
    DataMock.expects('find').yields(null, expected);

    // then
    const data = new DataDao().findDataByRequestId('507f191e810c19729de860ea');
    expect(data).to.equal(valueExpected);
    DataMock.verify();
    DataMock.restore();
    done();
  });

  it('should save and get data', (done) => {
    // given
    const DataMock = sinon.mock(DataSchema);
    const dataDao = new DataDao();
    const expectedValue = 'some data';
    const requestId = '507f191e810c19729de860ea';
    const expectedFind = { status: true, data: [{ value: `${expectedValue}` }] };

    // when
    DataMock.expects('find').yields(null, expectedFind);

    // then
    dataDao.saveData(requestId, expectedValue);
    const result = dataDao.findDataByRequestId(requestId);
    expect(expectedValue).to.equal(result);
    DataMock.verify();
    DataMock.restore();
    done();
  });

  it('should return empty collection if there was no save', (done) => {
    // given
    const DataMock = sinon.mock(DataSchema);
    const dataDao = new DataDao();
    const requestId = '507f191e810c19729de860ea';
    const expectedFind = { status: true, data: [] };

    // when
    DataMock.expects('find').yields(null, expectedFind);

    // then
    const result = dataDao.findDataByRequestId(requestId);
    expect('').to.equal(result);
    DataMock.verify();
    DataMock.restore();
    done();
  });
});
