const axios = require('axios');
const DataClient = require('../domain/common/port/DataClient');


class AxiosDataClientAdapter extends DataClient {
  async fetch(url) {
    const response = await axios.get(url);

    return response.data;
  }
}

module.exports = AxiosDataClientAdapter;
