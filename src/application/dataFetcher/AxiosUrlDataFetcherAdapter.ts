import axios from 'axios';
import DataFetcher from '../../domain/common/port/DataFetcherPort';
import { HttpError } from '../../domain/common/utils/error';
import RequestUrlParser from "@core/domain/request/RequestUrlParser";

class AxiosUrlDataFetcherAdapter implements DataFetcher {
  async fetch(request): Promise<string> {
    const rawUrl = RequestUrlParser.resolveRawUrl(request.url);

    try {
      const { data } = await axios.get(rawUrl);

      return data;
    } catch (e) {
      throw new HttpError(e.response.statusText, e.response.status);
    }
  }
}

export default AxiosUrlDataFetcherAdapter;
