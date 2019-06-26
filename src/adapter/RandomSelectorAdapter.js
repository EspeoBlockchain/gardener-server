const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class RandomSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'random';
  }

  select(data, path) {
    return data;
  }
}

module.exports = RandomSelectorAdapter;
