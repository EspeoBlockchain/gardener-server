import UrlDataFetcher from '@core/domain/common/port/UrlDataFetcherPort';
import { HttpError } from '@core/domain/common/utils/error';
import axios from 'axios';

class AxiosUrlDataFetcherAdapter implements UrlDataFetcher {
  async fetch(url): Promise<string> {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (e) {
      throw new HttpError(e.response.statusText, e.response.status);
    }
  }
}

export default AxiosUrlDataFetcherAdapter;
