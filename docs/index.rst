.. Gardener documentation master file, created by
   sphinx-quickstart on Tue Jan 15 09:49:25 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Gardener
====================================
This open source project solves problem of getting into smart contracts knowledge from outside the blockchain.

Contents
========

:ref:`Keyword Index <genindex>`, :ref:`Search Page <search>`

.. toctree::
   :maxdepth: 2

   getting-started

Oracle theory
-------------
Oracle is a concept of getting information from outside of the blockchain to the smart contracts. Out of the box smart contracts cannot access anything outside of the blockchain network. That's were the oracle idea fits. The information exchange begins with the smart contract emitting an event describing the necessary information. A trusted off-chain server listening for such events parses it, gets data from a data source and passes it back to the smart contract.
