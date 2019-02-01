-------------
Configuration
-------------

Each part of gardener project (smart contracts repo, server, monitor) contains .env variables file.
This section is going to explain parameters from them. Default parameters are set in a way everything should work correctly when using local test blockchain (ganache) and following `getting-started guide <https://gardener.readthedocs.io/en/latest/getting-started.html>`__.

Server
======

- `PUBLIC_KEY` - address of the server's account, from which it sends the results of request to the smart contracts
- `PRIVATE_KEY` - private key of the server's account
- `ORACLE_ADDRESS` - address of the `Oracle` smart contract
- `DATABASE_URL` - URL with port for MongoDB connection
- `DATABASE_NAME` - MongoDB database name
- `NODE_URL` - URL for the provider to blockchain network
- `API_PORT` - port for exposing the server's REST API, currently the only endpoint is heartbeat used by Gardener's monitor
- `SAFE_DELAY_BLOCKS` - set a delay in a number of blocks to resist chain reorganization problem, server loads target block when it's number is at least `SAFE_DELAY_BLOCKS` lower than the youngest one
- `START_BLOCK` - set starting block number from which server listen for oracle requests
- `PERSISTENCE` - selected persistence type, currently supported: `INMEMORY` or `MONGODB`

Smart contracts
===============

- `PRIVATE_KEY` - private key used for contract deployment, if both `PRIVATE_KEY` and `MNEMONIC` are passed, `PRIVATE_KEY` is used
- `MNEMONIC` - 12 secret random words for accessing HD wallet (deployment)
- `PROVIDER_URL` - provider for deploying contracts into test network
- `ORACLE_SERVER_ADDRESS` - address of oracle server account

Monitor
=======

- `REACT_APP_PROVIDER_URL` - URL for the provider to blockchain network
- `REACT_APP_STATUS_URL` - hearbeat endpoint, responsible for checking if server is working
- `REACT_APP_ORACLE_ADDRESS` - address of the `Oracle` smart contract
