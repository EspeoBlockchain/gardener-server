/* eslint-disable no-unused-vars */
const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class IdentitySelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'ipfs';
  }

  select(data, path) {
    return data;
  }
}

module.exports = IdentitySelectorAdapter;
