/* eslint-disable class-methods-use-this, no-unused-vars */

class DataSelectorPort {
  select(data, path) {
    throw new Error('Not implemented');
  }

  canHandle(contentType) {
    throw new Error('Not implemented');
  }
}

module.exports = DataSelectorPort;
