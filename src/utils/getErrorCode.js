const _ = require('lodash');

const getErrorCode = (e) => {
  if (Number.isInteger(e.code)) {
    return e.code;
  }

  if (e.code === 'ENOTFOUND') {
    return 404;
  }

  const status = _.get(e, 'response.status');
  if (status) {
    return status;
  }

  throw e;
};

module.exports = getErrorCode;
