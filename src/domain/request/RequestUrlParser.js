const ErrorFactory = require('../common/utils/error/ErrorFactory');
const { NO_VALID_URL, INVALID_CONTENT_TYPE } = require('../common/utils/error/ErrorCode');


class RequestUrlParser {
  static resolveRawUrl(wrappedUrl) {
    const urlRegex = new RegExp(/\(https?:\/\/.+\)/);
    const matched = urlRegex.exec(wrappedUrl);
    if (!matched) {
      throw ErrorFactory.create(`Url not found in ${wrappedUrl}`, NO_VALID_URL);
    }
    const firstMatched = matched[0];

    return firstMatched.substring(1, firstMatched.length - 1);
  }

  static resolveContentType(wrappedUrl) {
    const typeRegex = new RegExp(/^(json|xml|html|ipfs)\(.+\)/);

    if (typeRegex.test(wrappedUrl)) {
      return typeRegex.exec(wrappedUrl)[1];
    }

    throw ErrorFactory.create('Request type is neither json nor xml nor html nor ipfs', INVALID_CONTENT_TYPE);
  }

  static resolveSelectionPath(wrappedUrl) {
    const rawUrl = this.resolveRawUrl(wrappedUrl);
    const pathStartIndex = wrappedUrl.indexOf(rawUrl) + rawUrl.length + 1; // + 1 for bracket char

    return wrappedUrl.substr(pathStartIndex);
  }
}

module.exports = RequestUrlParser;
