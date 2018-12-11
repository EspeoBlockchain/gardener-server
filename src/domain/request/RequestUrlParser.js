class RequestUrlParser {
  static resolveRawUrl(wrappedUrl) {
    const urlRegex = new RegExp(/\(https?:\/\/.+\)/);
    const matched = urlRegex.exec(wrappedUrl);
    if (!matched) {
      throw new Error(`Url not found in ${wrappedUrl}`);
    }
    const firstMatched = matched[0];

    return firstMatched.substring(1, firstMatched.length - 1);
  }

  static resolveContentType(wrappedUrl) {
    const typeRegex = new RegExp(/^(json|xml|html|ipfs)\(.+\)/);

    if (typeRegex.test(wrappedUrl)) {
      return typeRegex.exec(wrappedUrl)[1];
    }

    throw new Error('Request type is neither json nor xml nor html nor ipfs');
  }

  static resolveSelectionPath(wrappedUrl) {
    const rawUrl = this.resolveRawUrl(wrappedUrl);
    const pathStartIndex = wrappedUrl.indexOf(rawUrl) + rawUrl.length + 1; // + 1 for bracket char

    return wrappedUrl.substr(pathStartIndex);
  }
}

module.exports = RequestUrlParser;
