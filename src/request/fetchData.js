const axios = require('axios');
const scheduler = require('node-schedule');

const base64Encode = data => Buffer.from(data).toString('base64');

const fetchData = async (url, time = 0) => {
  const startTime = new Date(Date.now());
  const endTime = new Date(Date.now() + (time * 1000));
  scheduler.scheduleJob({
    start: startTime,
    end: endTime,
  }, async () => {
    const response = await axios.get(url);
    const contentType = response.headers['content-type'];
    let fetchedData;
    if (typeof response.data === 'object') {
      fetchedData = JSON.stringify(response.data);
    }

    if (contentType.startsWith('text') || contentType.startsWith('application')) {
      fetchedData = response.data;
    }

    if (contentType.startsWith('multipart')
      || contentType.startsWith('message')
      || contentType.startsWith('image')
      || contentType.startsWith('audio')
      || contentType.startsWith('video')) {
      fetchedData = base64Encode(response.data);
    }
    return fetchedData;
  });
  throw new Error('Content-Type is unrecognized');
};

module.exports = fetchData;
