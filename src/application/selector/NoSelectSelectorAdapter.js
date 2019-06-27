const DataSelectorPort = require('../../domain/common/port/DataSelectorPort');

class NoSelectSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'random';
  }

  select(data, path) {
    return data;
  }
}

module.exports = NoSelectSelectorAdapter;
