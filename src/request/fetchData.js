const axios = require('axios');


const fetchData = async (url) => {
  try {
    const response = await axios.get(url);

    if (typeof response.data === 'object') {
      return JSON.stringify(response.data);
    }
    return response.data;
  } catch (e) {
    throw new Error('Request failed');
  }
};

module.exports = fetchData;
