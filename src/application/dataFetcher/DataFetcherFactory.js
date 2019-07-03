const UrlDataFetcher = require('./AxiosUrlDataFetcherAdapter');
const RandomDotOrgDataFetcher = require('./random/RandomDotOrgDataFetcherAdapter');
const RandomSgxDataFetcher = require('./random/RandomSgxDataFetcherAdapter');

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
          dataFetcher = new RandomSgxDataFetcher(logger);
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

module.exports = DataFetcherFactory;
