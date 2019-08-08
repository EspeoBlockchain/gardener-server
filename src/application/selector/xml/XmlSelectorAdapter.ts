import { DOMParser, XMLSerializer } from 'xmldom';
import xpath from 'xpath';

import DataSelectorPort from '@core/domain/common/port/DataSelectorPort';
import XmlResultConverter from './XmlResultConverter';

class XmlSelectorAdapter implements DataSelectorPort {
  private readonly domParser = new DOMParser();
  private readonly xmlSerializer = new XMLSerializer();

  canHandle(contentType: string): boolean {
    return ['xml', 'html'].includes(contentType);
  }

  select(data: string, path: string): string {
    if (!path) {
      return data;
    }

    const doc = this.domParser.parseFromString(data);
    this.checkXmlValidity(doc);

    const selected = xpath.select(path, doc);

    return XmlResultConverter.toString(selected);
  }

  private checkXmlValidity(doc: Document): void {
    // throws an error when doc is invalid xml
    this.xmlSerializer.serializeToString(doc);
  }
}

export default XmlSelectorAdapter;
