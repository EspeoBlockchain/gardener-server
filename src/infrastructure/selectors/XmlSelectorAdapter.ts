import { DOMParser, XMLSerializer } from 'xmldom';
import * as xpath from 'xpath';
import DataSelectorPort from '../../domain/common/port/DataSelectorPort';

class XmlSelectorAdapter implements DataSelectorPort {
  private readonly domParser: DOMParser;
  private readonly xmlSerializer: XMLSerializer;

  constructor() {
    this.domParser = new DOMParser();
    this.xmlSerializer = new XMLSerializer();
  }

  canHandle(contentType) {
    return ['xml', 'html'].includes(contentType);
  }

  select(data, path) {
    const doc = this.domParser.parseFromString(data);
    this.xmlSerializer.serializeToString(doc); // this throw an error when doc is invalid xml

    if (path === null) {
      return doc.toString();
    }

    const selected = xpath.select(path, doc);

    if (selected instanceof Array && selected.length === 0) {
      return null;
    }

    if (selected instanceof Array && selected.length > 1) {
      const parsedResults = selected.map((el) => {
        // @ts-ignore
        if (el.data) {
          // @ts-ignore
          return `<result>${el.data}</result>`;
        }
        return el;
      });
      return `<resultlist>${parsedResults.join('')}</resultlist>`;
    }

    return selected.toString();
  }
}

export default XmlSelectorAdapter;
