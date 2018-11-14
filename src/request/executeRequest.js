const RequestDao = require('../model/RequestDao');

const executeRequest = async (dateTime) => {
  const requestDao = new RequestDao();
  requestDao.findSingleRequestReadyToExecute(dateTime);
};

module.exports = executeRequest;
