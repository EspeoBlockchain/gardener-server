import _ from 'lodash';
import EventEmitter from 'events';
import OracleGateway from '../../../domain/blockchain/port/OracleGateway';

const ONE_SECOND_MILLIS = 1000;

class EthereumOracleAdapter extends OracleGateway {
  contract: any;
  pendingResponses: any[];
  emitter: EventEmitter;
  guard: boolean;
  constructor(web3, abi, address) {
    super();
    this.contract = new web3.eth.Contract(abi, address, { from: web3.eth.defaultAccount });

    this.pendingResponses = [];
    this.emitter = new EventEmitter();
    this.guard = false;

    setInterval(() => this._sendPendingResponse(), ONE_SECOND_MILLIS);
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

  sendResponse(response) {
    this.pendingResponses.push(response);
    return new Promise((resolve, reject) => {
      this.emitter.on(EthereumOracleAdapter._finishedEventName(response.requestId), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async _sendPendingResponse() {
    if (this.guard) {
      return;
    }
    this.guard = true;

    const response = this.pendingResponses.shift();
    if (response === undefined) {
      this.guard = false;
      return;
    }

    const method = this.contract.methods.fillRequest(
      response.requestId,
      response.selectedData || '',
      response.errorCode,
    );

    let error;
    try {
      const gas = await method.estimateGas();
      await method.send({ gas });
    } catch (e) {
      error = e;
    }

    this.emitter.emit(EthereumOracleAdapter._finishedEventName(response.requestId), error);
    this.guard = false;
  }

  static _finishedEventName(requestId) {
    return `finished-${requestId}`;
  }
}

export default EthereumOracleAdapter;
