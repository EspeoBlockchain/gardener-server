const axios = require('axios');

const DataFetcher = require('../../domain/common/port/DataFetcherPort');
const { HttpError } = require('../../domain/common/utils/error');
const RequestUrlParser = require('../../domain/request/RequestUrlParser');


class AxiosUrlDataFetcherAdapter extends DataFetcher {
  async fetch(request) {
    const rawUrl = RequestUrlParser.resolveRawUrl(request.url);

    try {
      const response = await axios.get(rawUrl);

      return response.data;
    } catch (e) {
      throw new HttpError(e.response.statusText, e.response.status);
    }
  }
}

module.exports = AxiosUrlDataFetcherAdapter;
