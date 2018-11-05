const axios = require('axios');

const base64Encode = data => Buffer.from(data).toString('base64');

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    const contentType = response.headers['content-type'];

    if (typeof response.data === 'object') {
      return JSON.stringify(response.data);
    }

    if (contentType.startsWith('text') || contentType.startsWith('application')) {
      return response.data;
    }

    if (contentType.startsWith('multipart')
        || contentType.startsWith('message')
        || contentType.startsWith('image')
        || contentType.startsWith('audio')
        || contentType.startsWith('video')) {
      return base64Encode(response.data);
    }

    throw new Error('Content-Type is unrecognized');
  } catch (e) {
    throw new Error('Request failed');
  }
};


module.exports = fetchData;
