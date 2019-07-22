import RequestUrlParser from '@core/domain/request/RequestUrlParser';
import axios from 'axios';
import * as jp from 'jsonpath';

import DataFetcher from '@core/domain/common/port/DataFetcherPort';
import { HttpError } from '@core/domain/common/utils/error';
import Request from '@core/domain/request/Request';

class RandomDotOrgDataFetcherAdapter implements DataFetcher {
  constructor(private apiKey: string) {}

  async fetch(request: Request) {
    let response;

    const min = RequestUrlParser.resolveLeftSideBound(request.url);
    const max = RequestUrlParser.resolveRightSideBound(request.url);

    try {
      response = await axios({
        method: 'post',
        url: 'https://api.random.org/json-rpc/2/invoke',
        headers: {
          'Content-Type': 'application/json',
        },
        data: `{"jsonrpc":"2.0","method":"generateIntegers","params":{
          "apiKey":"${this.apiKey}","n":1,"min":${min},"max":${max},"replacement":true,"base":10},"id":0
        }`,
      });

      return jp.value(response.data, 'result.random.data[0]').toString();
    } catch (e) {
      const randomDotOrgErrorCode = jp.value(response.data, 'error.code').toString();
      const randomDotOrgErrorMessage = jp.value(response.data, 'error.message').toString();

      throw new HttpError(randomDotOrgErrorMessage, randomDotOrgErrorCode);
    }
  }
}

export default RandomDotOrgDataFetcherAdapter;
