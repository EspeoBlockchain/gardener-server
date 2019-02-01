---------------
Getting started
---------------




Repositories
------------

Gardener server contains two main repositories: Gardener-sm which holds smart contracts, and gardener-server, which is responsible for fetching data from third party data sources. You can easily clone them.

1. Gardener server
::

  git clone https://github.com/EspeoBlockchain/gardener-server.git

2. Gardener smart contract
::

  git clone https://github.com/EspeoBlockchain/gardener-smart-contracts.git


Running blockchain
------------------

Before we will get information from external sources to our blockchain, we have to run it first. Let's use ganache for it.
Make sure that you are in gardener-server catalog, then:
::

  make ganache

If you see this information:
::

  Creating test-blockchain ... done

That means you have created test blockchain successfully. You can verify its status using:
::

  docker ps

After that you need to copy our smart contracts variables from template:
::

  cd gardener-smart-contracts
  make copy-env

Same attempt for gardener server:
::

  cd ../gardener-server
  make copy-env


Install dependencies
--------------------

Now, we are going to install dependencies that Gardener smart contract reliies on. You can do it by:
::

  cd ../gardener-smart-contract
  npm install


Migrate contracts
-----------------

We are now able to migrate our contracts to test blockchain network
::

   npx truffle migrate --network ganache --reset

Start gardener server
---------------------

We are just one step behind sending sample request to blockchain network.
::

   cd ../gardener-server
   make local

Make example oracle request
---------------------------
::

   cd ../gardener-smart-contracts
   npx truffle console --network ganache

At this moment we are in a console of truffle framework, which is responsible for communicating with blockchain network. Let's make a sample request. We can make specified type of request

JSON
***************
::

   truffle(ganache)> UsingOracle.deployed().then(instance => instance.request("json(https://api.coindesk.com/v1/bpi/currentprice.json).chartName"))


If you did everything correctly you should see something simmilar to
::

   { tx: '0x57a34e45e1f187ddeb4cbd1be3597561855563e5735a483a5b1edeb73a511278',
     receipt:
      { transactionHash: '0x57a34e45e1f187ddeb4cbd1be3597561855563e5735a483a5b1edeb73a511278',
        transactionIndex: 0,
        blockHash: '0x212e264c92bef193e4531cc151d5b3b36818bc4bf82e154e84af6a7c6a153b43',
        blockNumber: 18,
        from: '0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1',
        to: '0x9561c133dd8580860b6b7e504bc5aa500f0f06a7',
        gasUsed: 97604,
        cumulativeGasUsed: 97604,
        contractAddress: null,
        logs: [ [Object], [Object] ],
        status: '0x1',
        logsBloom: '0x00040000000000000010000000000000000000000000000000000000000000000000000000000002000000000000010000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000004000000000000000000200000000000000000000000000000000000000000000000000000020400000005000000000000000000000000000000000000000000000000000000000000000000000',
        v: '0x1b',
        r: '0x21052fa282f9723d221ef288cec6e947cb2ba0ef3f1d470f5dc8845806f66977',
        s: '0x1723cb7b4288f6ae32f3495d666522859150fe3d0c8e4debd3a80d452f940f50' },
     logs:
      [ { logIndex: 1,
          transactionIndex: 0,
          transactionHash: '0x57a34e45e1f187ddeb4cbd1be3597561855563e5735a483a5b1edeb73a511278',
          blockHash: '0x212e264c92bef193e4531cc151d5b3b36818bc4bf82e154e84af6a7c6a153b43',
          blockNumber: 18,
          address: '0x9561c133dd8580860b6b7e504bc5aa500f0f06a7',
          type: 'mined',
          event: 'DataRequestedFromOracle',
          args: [Object] } ] }

Server logs
--------------
Go to server container logs to check if response was sent.

Read more
------------
https://truffleframework.com/ganache - Information about Ganache

