class XmlResultFormatter {
  static toString(results) {
    if (Array.isArray(results)) {
      switch (results.length) {
        case 0:
          return null;
        case 1:
          return results[0].toString();
        default:
          return this.__wrapCollections(results.map(el => this.__wrapSingleNode(el)));
      }
    }

    return results.toString();
  }

  static __wrapSingleNode(node) {
    const wrapInResultTag = el => `<result>${el}</result>`;

    return node.nodeValue ? wrapInResultTag(node.nodeValue) : node;
  }

  static __wrapCollections(nodes) {
    return `<resultlist>${nodes.join('')}</resultlist>`;
  }
}

module.exports = XmlResultFormatter;
