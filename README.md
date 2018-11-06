# Oracle server

This repository is a part of open source oracle project. Initially developed by Espeo Software.

Table of contents:
- [Oracle theory](#oracle-theory)
- [Installation](#installation)

## Oracle theory
Oracle is a concept of getting informations from outside blockchain into smart contracts. Basically smart contracts cannot call anything which is outside the blockchain network. That's were oracle idea goes into. Smart contract emits event with needed informations and trusted offchain server listening on that parses it, get data from offchain data source and pass it back using it's credentials.

## Installation

### Natively


Dev environment:
1. Run `npm install` to install dependencies. Assumed you have `node >= 8.11` installed.
2. Run `npm run ganache` to start test blockchain.
3. Deploy needed smart contracts from oracle-sm repository: `truffle migrate --network development`.
4. Update `.env` file if neded.
5. Start oracle server by typing `npm start`.

### Using docker

Just type ``docker-compose up`` in root folder. Docker would build and run oracle server and test ganache network. Assuming that you have docker installed on your machine.
