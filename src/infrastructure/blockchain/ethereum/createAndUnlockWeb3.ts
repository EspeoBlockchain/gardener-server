import Web3 from 'web3';

const web3 = new Web3(process.env.NODE_URL);

web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);
web3.eth.defaultAccount = process.env.ADDRESS;

export default web3;
