# Gardener server

[![CircleCI](https://circleci.com/gh/espeo/blockchain-oracle-server.svg?style=shield)](https://circleci.com/gh/espeo/blockchain-oracle-server)

This repository is a part of open source oracle project. Initially developed by Espeo Software. 
Contains off-chain server for processing requests from Oracle contract.

Table of contents:
- [Oracle theory](#oracle-theory)
- [Architecture](#architecture)
- [Installation](#installation)

## What does the name mean?
There is very pretty metaphore about smart contracts functioning into blockchain network. 

Let's imagine a beautiful, big garden in which plants grows. Plants are extra natural and they can communicate with each other.
Unfortunatelly the garden is surrounded by really high wall, so noone can see anything over it. Plants don't know anything about outside world even they want so very much.
Luckily for them there is the Gardener, who comes to the garden in order to take care of plants. He relates them what they want to know about what happens outside the garden.
Plants trusts everything what Gardener says, and he also feels weight of information he passed to the plants as he is their only version of truth about world outside.

Sometimes plants want to prove them information. Let's say that they want to know if any apples grows outside. They want to see an apple which isn't from the garden.
Then Gardener has to bring an apple with him in order to convince plants that he says truth. Gardener knows that he has to always tell them truth, as if they would check him and discover that he lied, will never ever trust him again and he would lost all friends he has in the garden. It's some kind of symbiosis, plants need the Gardener to know information about outside world and Gardener needs plants to have someone he can take care. Otherwise his work has no sense.

The Gardener is our fiction person made up for this project but we think it's a perfect match as a name.

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
