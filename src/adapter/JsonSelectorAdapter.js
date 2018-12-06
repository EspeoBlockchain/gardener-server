/* eslint-disable class-methods-use-this */
const jp = require('jsonpath');
const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class JsonSelectorAdapter extends DataSelectorPort {
  select(data, path) {
    const json = JSON.parse(data);
    const value = jp.value(json, path);

    if (typeof value === 'string') {
      return value;
    }

    return JSON.stringify(value);
  }
}

module.exports = JsonSelectorAdapter;
