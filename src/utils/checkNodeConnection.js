const web3 = require('./createAndUnlockWeb3');
const logger = require('../config/winston');

const checkNodeConnection = async () => {
  try {
    await web3.eth.net.isListening();
    logger.info('Node connection successful');
  } catch (error) {
    logger.error(`Node connection error: (${error})`);
    return false;
  }

  return true;
};

module.exports = checkNodeConnection;
