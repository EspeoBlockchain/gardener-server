/* eslint-disable no-unused-vars */
const DataSelectorPort = require('../../domain/common/port/DataSelectorPort');

class IdentitySelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'ipfs';
  }

  select(data, path) {
    if (path) {
      throw new Error('Path must be empty for IdentitySelector');
    }

    return data;
  }
}

module.exports = IdentitySelectorAdapter;
