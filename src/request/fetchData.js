const axios = require('axios');
const delay = require('delay');


const fetchData = async (url, time = 0) => {
  await delay(time * 1000);
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
