import { InvalidContentTypeError, InvalidUrlError } from '../common/utils/error';

class RequestUrlParser {
  static resolveRawUrl(wrappedUrl): string {
    const urlRegex = new RegExp(/\(https?:\/\/[^)]+\)/);
    const matched = urlRegex.exec(wrappedUrl);
    if (!matched) {
      throw new InvalidUrlError(`Url not found in ${wrappedUrl}`);
    }
    const firstMatched = matched[0];

    return firstMatched.substring(1, firstMatched.length - 1);
  }

  static resolveContentType(wrappedUrl): string {
    const typeRegex = new RegExp(/^(json|xml|html|ipfs)\(.+\)/);

    if (typeRegex.test(wrappedUrl)) {
      return typeRegex.exec(wrappedUrl)[1];
    }

    throw new InvalidContentTypeError('Request type is neither json nor xml nor html nor ipfs');
  }

  static resolveSelectionPath(wrappedUrl): string {
    const rawUrl = this.resolveRawUrl(wrappedUrl);
    const pathStartIndex = wrappedUrl.indexOf(rawUrl) + rawUrl.length + 1; // + 1 for bracket char

    return wrappedUrl.substr(pathStartIndex);
  }
}

export default RequestUrlParser;
