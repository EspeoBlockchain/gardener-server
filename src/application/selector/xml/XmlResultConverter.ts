class XmlResultConverter {
  static toString(results: any) {
    if (Array.isArray(results)) {
      switch (results.length) {
        case 0:
          return null;
        case 1:
          return results[0].toString();
        default:
          return this.__wrapCollection(results.map(this.__wrapSingleNode));
      }
    }

    return results.toString();
  }

  static __wrapSingleNode(node: Node) {
    const wrapInResultTag = (el: string) => `<result>${el}</result>`;

    return node.nodeValue ? wrapInResultTag(node.nodeValue) : node;
  }

  static __wrapCollection(nodes: Array<string | Node>) {
    return `<resultlist>${nodes.join('')}</resultlist>`;
  }
}

export default XmlResultConverter;
