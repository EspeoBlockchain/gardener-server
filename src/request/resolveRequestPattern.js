

const getRequestType = (request) => {
  const regex = new RegExp(/^(json|xml|html|ipfs)\(.+\)/);

  if (regex.test(request)) {
    return regex.exec(request)[1];
  }

  throw new Error('Request type is neither json nor xml nor html');
};

const getRequestUrl = (request, type) => {
  if (type === 'json' || type === 'xml') {
    const urlRegex = new RegExp(/\(https?:\/\/.+\)/);
    const matched = urlRegex.exec(request)[0];
    return matched.substring(1, matched.length - 1);
  }
  if (type === 'ipfs') {
    const ipfsRegex = new RegExp(/\(([^)]+)\)/);
    const matched = ipfsRegex.exec(request)[1];
    return `https://gateway.ipfs.io/ipfs/${matched}`;
  }

  throw new Error('Invalid type: neither json nor xml nor ipfs');
};

/*
  Consistent-return and default-case has been disabled just for eslint proposes.
  Default switch case will never happen because of getRequestType method.
  Regex is validating only specific types and throw error if there will be any incorrect type.
 */
/* eslint-disable consistent-return, default-case */
const getPath = (request, type) => {
  switch (type) {
    case 'json': {
      const wrappedUrlRegex = new RegExp(/^(json)\(.+\)\./);
      const urlPart = wrappedUrlRegex.exec(request)[0];

      return request.substr(urlPart.length);
    }
    case 'xml':
    case 'html': {
      const wrappedUrlRegex = new RegExp(/^(xml|html)\(.+\)(\/.+)/);
      const path = wrappedUrlRegex.exec(request)[2];

      return path;
    }
      case 'ipfs': {
          return '';
      }
  }
};
/* eslint-enable consistent-return, default-case */

const resolveRequestPattern = (request) => {
  const type = getRequestType(request);
  const url = getRequestUrl(request, type);

  return {
    type,
    url,
    path: getPath(request, type),
  };
};

module.exports = resolveRequestPattern;
