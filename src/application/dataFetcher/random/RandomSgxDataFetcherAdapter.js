const ffi = require('ffi');
const ref = require('ref');

const intType = ref.types.int;
const longType = ref.types.long;
const longPtr = ref.refType('long');

class RandomSgxDataFetcherAdapter {
  constructor(logger) {
    this.logger = logger;
  }

  async fetch(min, max) {
    this.logger.info('fetching SGX shiet');
    const sgxLib = ffi.DynamicLibrary('/usr/src/app/libs/EnclaveWrapper.so', {
      'generateRandom': [intType, [longType, longType, longPtr]],
    });
    //const sgxLib = ffi.DynamicLibrary('/usr/src/app/libs/EnclaveWrapper.so');

    const randomPtr = ref.alloc(longType);
    if (sgxLib.generateRandom(min, max, randomPtr) === -1) {
      throw new Error('SGX call failed');
    }
    this.logger.info('fetched SGX shiet');

    return randomPtr.deref();
  }
}

module.exports = RandomSgxDataFetcherAdapter;
