const _ = require('lodash');
const RequestDao = require('../model/RequestDao');
const fetchData = require('./fetchData');
const resolveRequestPattern = require('./resolveRequestPattern');
const selectData = require('./selectData');


const executeRequest = async (dateTime) => {
  const requestDao = new RequestDao();
  const request = requestDao.findSingleRequestReadyToExecute(dateTime);
  const resolvedRequest = await resolveRequestPattern(request);
  const requestData = await fetchData(resolvedRequest.url);

  return selectData(requestData, _.pick(resolvedRequest, ['type', 'path']));
};

module.exports = executeRequest;
