---------------
Getting started
---------------




Repositories
------------

Gardener consists of three repositories, two main ones: gardener-smart-contracts which holds smart contracts, and gardener-server, which is responsible for fetching data from third party data sources.
The third one, gardener-monitor is optional and it helps visualizing requests.

1. Gardener server
::

  git clone https://github.com/EspeoBlockchain/gardener-server.git

2. Gardener smart contracts
::

  git clone https://github.com/EspeoBlockchain/gardener-smart-contracts.git

3. Gardener monitor (optional)
::

  git clone https://github.com/EspeoBlockchain/gardener-monitor.git


Running blockchain - Server
------------------

Before we will get information from external sources to our blockchain, we have to run it first. Let's use ganache for it.
First of all, copy server variables from template:
::

  make copy-env

After that, we can run our blockchain. Let's use ganache for it:  
::

  make ganache

If you see this information:
::

  Creating test-blockchain ... done

That means you have created test blockchain successfully. You can verify its status using:
::

  docker ps

Running blockchain - Monitor (optional)
------------------------
::

  cd ../gardener-monitor
  cp .env.tpl .env
  npm install
  npm start

Running blockchain - Smart contracts
-------------------

After starting blockchain, we need to copy our smart contracts variables from template. 
Make sure that you are in gardener-smart-contracts directory, then:
::

  make copy-env

Now, we are going to install dependencies that Gardener smart contract relies on. When you are in gardener-smart-contracts directory, then:
::

  npm install


After installing dependencies, we are going to migrate our contracts to test blockchain network
::

   npx truffle migrate --network ganache --reset


Make example oracle request
---------------------------
After we have successfully configured environment, we can make example oracle request. 
Go to `gardener-server` directory, then:
::

   make local

Change your directory to `gardener-smart-contract`, then:

::

   npx truffle console --network ganache

At this moment we are in Truffle Framework console, which can be used for communicating with blockchain network. Let's make a sample request. You can find more information about request specification :ref:`making-requests` section.

Example
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
Look up the server container logs to check if response was sent. Moreover, you can check the request and response in the monitor if you've installed and ran it.

Read more
------------
https://truffleframework.com/ganache - Information about Ganache

