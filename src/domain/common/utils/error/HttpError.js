const InvalidRequestError = require('./InvalidRequestError');

class HttpError extends InvalidRequestError {}

module.exports = HttpError;
