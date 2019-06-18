const xpath = require('xpath');
const { XMLSerializer, DOMParser } = require('xmldom');
const DataSelectorPort = require('../../../domain/common/port/DataSelectorPort');
const XmlResultFormatter = require('./XmlResultFormatter');


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
    if (!path) {
      return data;
    }

    const doc = this.domParser.parseFromString(data);
    this.__checkXmlValidity(doc);

    const selected = xpath.select(path, doc);

    return XmlResultFormatter.toString(selected);
  }

  __checkXmlValidity(doc) {
    // throws an error when doc is invalid xml
    this.xmlSerializer.serializeToString(doc);
  }
}

module.exports = XmlSelectorAdapter;
