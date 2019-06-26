import * as EventEmitter from 'events';
import * as _ from 'lodash';

import Request from '@core/domain/request/Request';
import {Contract} from 'web3-eth-contract/types';
import {AbiItem} from 'web3-utils/types';
import Web3 from 'web3/types';
import OracleGateway from '../../../domain/blockchain/port/OracleGateway';

const ONE_SECOND_MILLIS = 1000;

class EthereumOracleAdapter implements OracleGateway {
  private static finishedEventName(requestId): string {
    return `finished-${requestId}`;
  }

  private pendingResponses: any[];
  private emitter: EventEmitter;
  private guard: boolean;
  private contract: Contract;

  constructor(web3: Web3, abi: AbiItem[], address: string) {
    // @ts-ignore
    this.contract = new web3.eth.Contract(abi, address, { from: web3.eth.defaultAccount });

    this.pendingResponses = [];
    this.emitter = new EventEmitter();
    this.guard = false;

    setInterval(() => this.sendPendingResponse(), ONE_SECOND_MILLIS);
  }

  public getRequests(fromBlock, toBlock): Promise<Request[]> {
    // @ts-ignore
    const dataRequestedEventsPromise = this.contract.getPastEvents('DataRequested', { fromBlock, toBlock })
      .then(events => events.map(
        event => _.pick(event.returnValues, ['id', 'url']),
      ));
    // @ts-ignore
    const delayedDataRequestedEventsPromise = this.contract.getPastEvents('DelayedDataRequested', { fromBlock, toBlock })
      .then(events => events.map(
        event => _.pick(event.returnValues, ['id', 'url', 'validFrom']),
      ));

    return Promise.all([dataRequestedEventsPromise, delayedDataRequestedEventsPromise])
      .then(values => values.reduce(
        (previous: any, current) => previous.concat(current), [],
      ))
      .then(events => events.map(event => ({
        ...event,
        validFrom: event.validFrom ? new Date(event.validFrom * 1000) : new Date(),
      })));
  }

  public sendResponse(response): Promise<void> {
    this.pendingResponses.push(response);
    return new Promise((resolve, reject) => {
      this.emitter.on(EthereumOracleAdapter.finishedEventName(response.requestId), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  private async sendPendingResponse(): Promise<void> {
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

    this.emitter.emit(EthereumOracleAdapter.finishedEventName(response.requestId), error);
    this.guard = false;
  }
}

export default EthereumOracleAdapter;
