const axios = require('axios');
const UrlDataFetcher = require('../domain/common/port/UrlDataFetcherPort');


class AxiosUrlDataFetcherAdapter extends UrlDataFetcher {
  async fetch(url) {
    const response = await axios.get(url);

    return response.data;
  }
}

module.exports = AxiosUrlDataFetcherAdapter;
