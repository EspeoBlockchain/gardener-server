const { InvalidUrlError, InvalidContentTypeError } = require('../common/utils/error');


class RequestUrlParser {
  static resolveRawUrl(wrappedUrl) {
    const urlRegex = new RegExp(/\(https?:\/\/.+\)/);
    const matched = urlRegex.exec(wrappedUrl);
    if (!matched) {
      // TODO Assuming that it's url based (not the case in eg. random),
      // shouldn't this validation be done per provider?
      throw new InvalidUrlError(`Url not found in ${wrappedUrl}`);
    }
    const firstMatched = matched[0];

    return firstMatched.substring(1, firstMatched.length - 1);
  }

  static resolveContentType(wrappedUrl) {
    // TODO This is duplicating information, and also with hardcoded literals
    // We shoiuld have a mapping of contentType -> provider somewhere
    const typeRegex = new RegExp(/^(json|xml|html|ipfs|random)\(.+\)/);

    if (typeRegex.test(wrappedUrl)) {
      return typeRegex.exec(wrappedUrl)[1];
    }

    throw new InvalidContentTypeError('Request type is neither json nor xml nor html nor ipfs nor random');
  }

  static resolveSelectionPath(wrappedUrl) {
    const rawUrl = this.resolveRawUrl(wrappedUrl);
    const pathStartIndex = wrappedUrl.indexOf(rawUrl) + rawUrl.length + 1; // + 1 for bracket char

    return wrappedUrl.substr(pathStartIndex);
  }

  static resolveLeftSideBound(wrappedUrl) {
    const typeRegex = new RegExp(/^random\((\d+),(\d+)\)/);

    if (typeRegex.test(wrappedUrl)) {
      return typeRegex.exec(wrappedUrl)[1];
    }

    throw new InvalidContentTypeError('Invalid numeric bounds format');
  }

  static resolveRightSideBound(wrappedUrl) {
    const typeRegex = new RegExp(/^random\((\d+),(\d+)\)/);

    if (typeRegex.test(wrappedUrl)) {
      return typeRegex.exec(wrappedUrl)[2];
    }

    throw new InvalidContentTypeError('Invalid numeric bounds format');
  }
}

module.exports = RequestUrlParser;
