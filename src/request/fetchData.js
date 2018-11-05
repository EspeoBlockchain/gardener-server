const axios = require('axios');


const fetchData = async (url) => {
  const response = await axios.get(url);

  if (typeof response.data === 'object') {
    return JSON.stringify(response.data);
  }

  return response.data;
};

module.exports = fetchData;
