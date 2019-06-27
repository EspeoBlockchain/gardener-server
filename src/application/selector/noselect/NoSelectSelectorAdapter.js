const DataSelectorPort = require('../../../domain/common/port/DataSelectorPort');

class NoSelectSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'random';
  }

  select(data, path) {
    if (path) {
      throw new Error('Path must be empty for IdentitySelector');
    }

    return data;
  }
}

module.exports = NoSelectSelectorAdapter;
