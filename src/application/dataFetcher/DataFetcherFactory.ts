import UrlDataFetcher from './AxiosUrlDataFetcherAdapter';
import RandomDotOrgDataFetcher from './random/RandomDotOrgDataFetcherAdapter';
import RandomSgxDataFetcher from './random/RandomSgxDataFetcherAdapter';

class DataFetcherFactory {
  static createDataFetcher(contentType, sgxEnabled, randomDotOrgApiKey, logger) {
    let dataFetcher;

    switch (contentType) {
      case 'json':
      case 'xml':
      case 'ipfs':
        dataFetcher = new UrlDataFetcher();
        break;
      case 'random':
        if (sgxEnabled === 'true') {
          dataFetcher = new RandomSgxDataFetcher();
        } else {
          dataFetcher = new RandomDotOrgDataFetcher(randomDotOrgApiKey);
        }
        break;
      default:
        throw new Error();
    }

    return dataFetcher;
  }
}

export default DataFetcherFactory;
