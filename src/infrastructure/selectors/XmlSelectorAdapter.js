const xpath = require('xpath');
const { XMLSerializer, DOMParser } = require('xmldom');
const DataSelectorPort = require('../../domain/common/port/DataSelectorPort');

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

    if (path === null) {
      return doc.toString();
    }

    const selected = xpath.select(path, doc);

    if (selected instanceof Array && selected.length === 0) {
      return null;
    }

    if (selected instanceof Array && selected.length > 1) {
      const parsedResults = selected.map((el) => {
        if (el.data) {
          return `<result>${el.data}</result>`;
        }
        return el;
      });
      return `<resultlist>${parsedResults.join('')}</resultlist>`;
    }

    return selected.toString();
  }
}

module.exports = XmlSelectorAdapter;
