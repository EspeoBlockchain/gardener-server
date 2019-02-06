const jp = require('jsonpath');
const DataSelectorPort = require('../../domain/common/port/DataSelectorPort');

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

    if (results.length === 0) {
      return null;
    }

    if (results.length === 1) {
      if (typeof results[0] === 'string') {
        return results[0];
      }
      return JSON.stringify(results[0]);
    }

    return JSON.stringify(results);
  }
}

module.exports = JsonSelectorAdapter;
