/* eslint-disable no-unused-expressions,array-callback-return */
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { assert } = require('chai');
require('sinon-mongoose');

const DataSchema = require('../../src/model/DataSchema');
const DataDao = require('../../src/model/DataDao');

describe('DataDao', () => {
  it('should find data for request id', async () => {
    // given
    const data = {
      request_id: '1',
      fetchedData: 'fetchedData',
      selectedData: 'selectedData',
    };
    const dataMock = sinon.mock(DataSchema);
    dataMock.expects('findOne').chain('exec').resolves(data).once();

    // when
    const result = await new DataDao().findDataByRequestId('1');

    // then
    dataMock.verify();
    dataMock.restore();
    assert.deepEqual(result, data);
  });
});
