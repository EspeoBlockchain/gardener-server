

const getRequestType = (request) => {
  const regex = new RegExp(/^(json|xml|html)\(.+\)/);

  if (regex.test(request)) {
    return regex.exec(request)[1];
  }

  throw new Error('Request type is neither json nor xml nor html');
};

const getRequestUrl = (request) => {
  const urlRegex = new RegExp(/\(https?:\/\/.+\)/);
  const matched = urlRegex.exec(request)[0];

  return matched.substring(1, matched.length - 1);
};

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
    default:
      throw new Error('Request type is neither json nor xml nor html');
  }
};

const resolveRequestPattern = (request) => {
  const type = getRequestType(request);
  const url = getRequestUrl(request);

  return {
    type,
    url,
    path: getPath(request, type),
  };
};

module.exports = resolveRequestPattern;
