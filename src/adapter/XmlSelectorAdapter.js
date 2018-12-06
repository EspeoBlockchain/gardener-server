/* eslint-disable class-methods-use-this */
const xpath = require('xpath');
const { XMLSerializer, DOMParser } = require('xmldom');
const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class XmlSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return ['xml', 'html'].includes(contentType);
  }

  select(data, path) {
    const doc = (new DOMParser()).parseFromString(data);

    if (xpath.select(path, doc)[0].firstChild.data) {
      return xpath.select(path, doc)[0].firstChild.data;
    }

    return (new XMLSerializer()).serializeToString(xpath.select(path, doc)[0].firstChild);
  }
}

module.exports = XmlSelectorAdapter;
