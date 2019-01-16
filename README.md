# Oracle server

[![CircleCI](https://circleci.com/gh/EspeoBlockchain/gardener-server.svg?style=shield)](https://circleci.com/gh/EspeoBlockchain/gardener-server)
[![Coverage Status](https://coveralls.io/repos/github/EspeoBlockchain/gardener-server/badge.svg)](https://coveralls.io/github/EspeoBlockchain/gardener-server)
[![Documentation Status](https://readthedocs.org/projects/gardener/badge/?version=latest)](https://gardener.readthedocs.io/en/latest/?badge=latest)


This repository is a part of open source oracle project. Initially developed by Espeo Software. 
Contains off-chain server for processing requests from the `Oracle` contract.

Detailed documentation here: https://gardener.readthedocs.io

Table of contents:
- [Oracle theory](#oracle-theory)
- [Architecture](#architecture)
- [Installation](#installation)

## Oracle theory
Oracle is a concept of getting information from outside of the blockchain to the smart contracts. Out of the box smart contracts cannot access anything outside of the blockchain network. That's were the oracle idea fits. The information exchange begins with the smart contract emitting an event describing the necessary information. A trusted off-chain server listening for such events parses it, gets data from a data source and passes it back to the smart contract.

## Architecture
[Oracle architecture sketch](images/OracleArchitecture.png) 

## Installation

As a first step please clone `.env.tpl` file into `.env` and fill with values:
- `PUBLIC_KEY` - address of the server's account, from which it sends the results of request to the smart contracts
- `PRIVATE_KEY` - private key of the server's account
- `ORACLE_ADDRESS` - address of the `Oracle` smart contract
- `DATABASE_URL` - URL with port for MongoDB connection
- `DATABASE_NAME` - MongoDB database name
- `NODE_URL` - URL for the WebSocket provider to blockchain network

### Bare-metal

Requirements:
- `Node.js >= 7.6` - async/await support

Dev environment:
1. Run `npm install` to install dependencies.
2. Run `npm run ganache` to start a test blockchain.
3. Deploy necessary smart contracts from `oracle-sm` repository: `cd oracle-sm/ && truffle migrate --network development`.
4. Update the `.env` file if necessary.
5. Start the server by running `npm start`.

### Using docker

#### Local environment with test blockchain (ganache)

1. Run: `make local` (single command build)
1. Build: `make build-local`
1. Clean: `make clean-local`

#### Environment using public blockchain

1. Run: `make` (single command build)
1. Build: `make build`
1. Clean: `make clean`

**Attention!** Check if variables in `.env` file are correct.
