import xpath from 'xpath';
import { XMLSerializer, DOMParser } from 'xmldom';
import DataSelectorPort from '../../../domain/common/port/DataSelectorPort';
import XmlResultConverter from './XmlResultConverter';


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

    return XmlResultConverter.toString(selected);
  }

  __checkXmlValidity(doc) {
    // throws an error when doc is invalid xml
    this.xmlSerializer.serializeToString(doc);
  }
}

module.exports = XmlSelectorAdapter;
