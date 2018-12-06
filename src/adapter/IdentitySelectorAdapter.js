/* eslint-disable class-methods-use-this, no-unused-vars */
const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class IdentitySelectorAdapter extends DataSelectorPort {
  select(data, path) {
    return data;
  }
}

module.exports = IdentitySelectorAdapter;
