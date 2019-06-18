const jp = require('jsonpath');
const DataSelectorPort = require('../../../domain/common/port/DataSelectorPort');
const JsonResultConverter = require('./JsonResultConverter');

class JsonSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'json';
  }

  select(data, path) {
    const json = typeof data === 'object' ? data : JSON.parse(data);

    if (!path) {
      return JSON.stringify(json);
    }

    const results = jp.query(json, `$${path}`);

    return JsonResultConverter.toString(results);
  }
}

module.exports = JsonSelectorAdapter;
