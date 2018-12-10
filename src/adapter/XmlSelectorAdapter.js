const xpath = require('xpath');
const { XMLSerializer, DOMParser } = require('xmldom');
const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class XmlSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return ['xml', 'html'].includes(contentType);
  }

  select(data, path) {
    const doc = (new DOMParser()).parseFromString(data);
    const { firstChild } = xpath.select(path, doc)[0];

    if (firstChild.data) {
      return firstChild.data;
    }

    return (new XMLSerializer()).serializeToString(firstChild);
  }
}

module.exports = XmlSelectorAdapter;
