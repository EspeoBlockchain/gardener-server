const AxiosUrlDataFetcherAdapter = require('./AxiosUrlDataFetcherAdapter');
const ConsoleLoggerAdapter = require('./ConsoleLoggerAdapter');
const IdentitySelectorAdapter = require('../infrastructure/selectors/IdentitySelectorAdapter');
const JsonSelectorAdapter = require('../infrastructure/selectors/JsonSelectorAdapter');
const XmlSelectorAdapter = require('../infrastructure/selectors/XmlSelectorAdapter');

module.exports = {
  AxiosUrlDataFetcherAdapter,
  ConsoleLoggerAdapter,
  IdentitySelectorAdapter,
  JsonSelectorAdapter,
  XmlSelectorAdapter,
};
