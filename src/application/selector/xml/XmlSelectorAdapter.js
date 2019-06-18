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
    const doc = this.domParser.parseFromString(data);
    this.xmlSerializer.serializeToString(doc); // this throw an error when doc is invalid xml

    const expression = path === null ? '//*' : path;
    const selected = xpath.select(expression, doc);

    return XmlResultFormatter.toString(selected);
  }
}

module.exports = XmlSelectorAdapter;
