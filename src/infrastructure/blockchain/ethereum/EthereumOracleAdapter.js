const _ = require('lodash');
const OracleGateway = require('../../../domain/blockchain/port/OracleGateway');


class EthereumOracleAdapter extends OracleGateway {
  constructor(web3, abi, address) {
    super();
    this.contract = new web3.eth.Contract(abi, address);
  }

  getRequests(fromBlock, toBlock) {
    const dataRequestedEventsPromise = this.contract.getPastEvents('DataRequested', { fromBlock, toBlock })
      .then(events => events.map(
        event => _.pick(event.returnValues, ['id', 'url']),
      ));
    const delayedDataRequestedEventsPromise = this.contract.getPastEvents('DelayedDataRequested', { fromBlock, toBlock })
      .then(events => events.map(
        event => _.pick(event.returnValues, ['id', 'url', 'validFrom']),
      ));

    return Promise.all([dataRequestedEventsPromise, delayedDataRequestedEventsPromise])
      .then(values => values.reduce(
        (previous, current) => previous.concat(current),
      ))
      .then(events => events.map(event => ({
        ...event,
        validFrom: event.validFrom ? new Date(event.validFrom * 1000) : new Date(),
      })));
  }
}

module.exports = EthereumOracleAdapter;
