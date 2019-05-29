const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class RandomSelectorAdapter extends DataSelectorPort {
  constructor(sgxEnable) {
    super();
    this.sgxEnable = sgxEnable;
  }

  canHandle(contentType) {
    return contentType === 'random';
  }

  select(data, path) {
    if (this.sgxEnable === 'true') {
      throw new Error('Not implemented');
    } else {
      return 123;
    }
  }
}

module.exports = RandomSelectorAdapter;
