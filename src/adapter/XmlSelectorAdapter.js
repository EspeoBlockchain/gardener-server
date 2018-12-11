const xpath = require('xpath');
const { XMLSerializer, DOMParser } = require('xmldom');
const DataSelectorPort = require('../domain/common/port/DataSelectorPort');

class XmlSelectorAdapter extends DataSelectorPort {
  constructor() {
    super();
    this.domParser = new DOMParser();
    this.xmlSerializer = new XMLSerializer();
  }

  canHandle(contentType) {
    return ['xml', 'html'].includes(contentType);
  }

  select(data, path) {
    const doc = this.domParser.parseFromString(data);
    const { firstChild } = xpath.select(path, doc)[0];

    if (firstChild.data) {
      return firstChild.data;
    }

    return this.xmlSerializer.serializeToString(firstChild);
  }
}

module.exports = XmlSelectorAdapter;
