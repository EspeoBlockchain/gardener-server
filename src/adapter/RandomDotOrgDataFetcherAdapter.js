const axios = require('axios');
const jp = require('jsonpath');
const { HttpError } = require('../domain/common/utils/error');


class RandomDotOrgDataFetcherAdapter {
  async fetch(min, max) {
    try {
      const config = {
        method: 'post',
        url: 'https://api.random.org/json-rpc/2/invoke',
        headers: {
          'Content-Type': 'application/json',
        },
        data: `{"jsonrpc":"2.0","method":"generateIntegers","params":{"apiKey":"00000000-0000-0000-0000-000000000000","n":1,"min":${min},"max":${max},"replacement":true,"base":10},"id":0}`,
      };

      const response = await axios(config);
      console.log(jp.value(response.data, 'result.random.data[0]'));

      return jp.value(response.data, 'result.random.data[0]').toString();
    } catch (e) {
      throw new HttpError(e.response.statusText, e.response.status);
    }
  }
}

module.exports = RandomDotOrgDataFetcherAdapter;
