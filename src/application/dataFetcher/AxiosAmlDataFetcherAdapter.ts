import axios from 'axios';

import DataFetcher from '@core/domain/common/port/DataFetcherPort';
import {HttpError} from '@core/domain/common/utils/error';
import Request from '@core/domain/request/Request';
import RequestUrlParser from '@core/domain/request/RequestUrlParser';

class AxiosAmlDataFetcherAdapter implements DataFetcher {
  constructor(private readonly bearerToken: string, private readonly baseUrl: string) {
  }

  async fetch(request: Request): Promise<string> {
    const cryptoType = RequestUrlParser.resolveAmlCryptoType(request.url);
    const address = RequestUrlParser.resolveAmlAddress(request.url);
    const urlToBeCalled = `${this.baseUrl}/${address}?address_type=${cryptoType}`;
    console.log(`using url ${urlToBeCalled}`);
    console.log(`using bearer 'Bearer ${this.bearerToken}'`);
    const config = {
      headers: { Authorization: `Bearer ${this.bearerToken}` },
    };
    const headers = new Map<string, string>();
    headers.set('Authorization', `Bearer ${this.bearerToken}`);

    try {
      const {data} = await axios.get(urlToBeCalled, config);

      return data;
    } catch (e) {
      console.log('headers used:');
      console.log(e.response.headers);
      throw new HttpError(e.response.statusText, e.response.status);
    }
  }
}

export default AxiosAmlDataFetcherAdapter;
