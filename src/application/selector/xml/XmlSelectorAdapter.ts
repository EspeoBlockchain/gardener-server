import { DOMParser, XMLSerializer } from 'xmldom';
import * as xpath from 'xpath';

import XmlResultConverter from './XmlResultConverter';
import DataSelectorPort from '../../../domain/common/port/DataSelectorPort';

class XmlSelectorAdapter extends DataSelectorPort {
  domParser: DOMParser;
  xmlSerializer: XMLSerializer;
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

export default XmlSelectorAdapter;
