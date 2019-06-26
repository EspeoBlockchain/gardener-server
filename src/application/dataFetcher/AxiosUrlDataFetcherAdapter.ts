import axios from 'axios';
import UrlDataFetcher from '../../domain/common/port/UrlDataFetcherPort';
import { HttpError } from '../../domain/common/utils/error';

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
