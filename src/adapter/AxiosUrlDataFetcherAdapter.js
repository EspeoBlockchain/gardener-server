const axios = require('axios');
const UrlDataFetcher = require('../domain/common/port/UrlDataFetcherPort');
const { HttpError } = require('../domain/common/utils/error');


class AxiosUrlDataFetcherAdapter extends UrlDataFetcher {
  async fetch(url) {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (e) {
      throw new HttpError(e.response.statusText, e.response.status);
    }
  }
}

module.exports = AxiosUrlDataFetcherAdapter;
