const axios = require('axios');

const base64Encode = data => Buffer.from(data).toString('base64');

const fetchData = async (url) => {
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
};

module.exports = fetchData;
