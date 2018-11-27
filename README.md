# Oracle server

[![CircleCI](https://circleci.com/gh/espeo/blockchain-oracle-server.svg?style=shield)](https://circleci.com/gh/espeo/blockchain-oracle-server)

This repository is a part of open source oracle project. Initially developed by Espeo Software. 
Contains off-chain server for processing requests from Oracle contract.

Table of contents:
- [Oracle theory](#oracle-theory)
- [Architecture](#architecture)
- [Installation](#installation)

## Oracle theory
Oracle is a concept of getting informations from outside blockchain into smart contracts. Basically smart contracts cannot call anything which is outside the blockchain network. That's were oracle idea goes into. Smart contract emits event with needed informations and trusted offchain server listening on that parses it, get data from offchain data source and pass it back using it's credentials.

## Architecture
[Oracle architecture sketch](images/OracleArchitecture.png) 

## Installation

Before start please clone `.env.tpl` file into `.env` and fill with values.

Variables explanation:
- `PUBLIC_KEY` - address of account, from which server should send result of request
- `PRIVATE_KEY` - private key of account, from which server should send result of request
- `ORACLE_ADDRESS` - address of deployed oracle smart contract
- `DATABASE_URL` - url and port for mongoDB connection
- `DATABASE_NAME` - database name
- `NODE_URL` - url for websocket(!!) provider to blockchain network

### Natively

Requirements:
- `NodeJS >= 7.6` - async/await support

Dev environment:
1. Run `npm install` to install dependencies.
2. Run `npm run ganache` to start test blockchain.
3. Deploy needed smart contracts from `oracle-sm` repository: `truffle migrate --network development`.
4. Update `.env` file if needed.
5. Start oracle server by typing `npm start`.

### Using docker

####Local environment with test blockchain (ganache):
Run:
1. Type `make local` (single command build)

Build:
1. Type `make build-local`

Clean:
1. Type `make clean-local`

####Environment using public blockchain:
Run:
1. Type `make` (single command build)

Build:
1. Type `make build`

Clean:
1. Type `make clean`

**Attention!** Check if variables in .env file are correct.
