

const getRequestType = (request) => {
  const jsonRegex = new RegExp(/^json\(.+\)/);
  const xmlRegex = new RegExp(/^xml\(.+\)/);

  if (jsonRegex.test(request)) {
    return 'json';
  }

  if (xmlRegex.test(request)) {
    return 'xml';
  }

  throw Error('Request type is neither json nor xml');
};

const getRequestUrl = (request) => {
  const urlRegex = new RegExp(/\(https?:\/\/.+\)/);
  const matched = urlRegex.exec(request)[0];

  return matched.substring(1, matched.length - 1);
};

const getPath = (request) => {
  const wrappedUrlRegex = new RegExp(/^(json|xml)\(.+\)\./);
  const urlPart = wrappedUrlRegex.exec(request)[0];

  return request.substr(urlPart.length);
};

const resolveRequestPattern = request => ({
  type: getRequestType(request),
  url: getRequestUrl(request),
  path: getPath(request),
});

module.exports = resolveRequestPattern;
