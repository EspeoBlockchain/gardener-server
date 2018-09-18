const _ = require('lodash');
const fetchData = require('./fetchData');
const resolveRequestPattern = require('./resolveRequestPattern');
const selectData = require('./selectData');


const processRequest = async (url) => {
  const requestPattern = resolveRequestPattern(url);
  const data = await fetchData(requestPattern.url);

  return selectData(data, _.pick(requestPattern, ['type', 'path']));
};

module.exports = processRequest;
