const jp = require('jsonpath');
const xpath = require('xpath');
const { XMLSerializer, DOMParser } = require('xmldom');


const selectData = (data, { type, path }) => {
  switch (type) {
    case 'json': {
      const json = JSON.parse(data);
      const value = jp.value(json, path);

      if (typeof value === 'string') {
        return value;
      }

      return JSON.stringify(value);
    }
    case 'xml':
    case 'html': {
      const doc = (new DOMParser()).parseFromString(data);

      if (xpath.select(path, doc)[0].firstChild.data) {
        return xpath.select(path, doc)[0].firstChild.data;
      }
      return (new XMLSerializer()).serializeToString(xpath.select(path, doc)[0].firstChild);
    }
    case 'ipfs': {
      return data;
    }
    default:
      throw new Error('Invalid type: neither json nor xml nor html');
  }
};

module.exports = selectData;
