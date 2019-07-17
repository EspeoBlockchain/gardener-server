const ffi = require('ffi');
const ref = require('ref');

const RequestUrlParser = require('../../../domain/request/RequestUrlParser');

const intType = ref.types.int;
const longType = ref.types.long;
const longPtrType = ref.refType(ref.types.long);

class RandomSgxDataFetcherAdapter {
  constructor(logger) {
    this.logger = logger;
    this.generateRandom = this._loadFunctionFromSgxLib(
        'generateRandom',
        intType,
        [longType, longType, longPtrType]
    );
  }

  async fetch(request) {
    const min = RequestUrlParser.resolveLeftSideBound(request.url);
    const max = RequestUrlParser.resolveRightSideBound(request.url);

    const longPtrAlloc = ref.alloc(longType);

    if (await this.generateRandom(await this._numberToLong(min), await this._numberToLong(max), longPtrAlloc) === -1) {
      throw new Error('SGX call failed');
    }

    return longPtrAlloc.deref().toString();
  }

  _loadFunctionFromSgxLib(name, returnType, params) {
    const mode = ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL;

    ffi.DynamicLibrary('libsgx_urts.so', mode);
    ffi.DynamicLibrary('Enclave.signed.so', mode);
    const sgxLib = ffi.DynamicLibrary('EnclaveWrapper.so', mode);

    return ffi.ForeignFunction(sgxLib.get(name), returnType, params);
  }

  async _numberToLong(number) {
    let buf = Buffer.alloc(4);
    buf.writeInt64LE(number, 0);
    buf.type = ref.types.long;

    return buf.deref();
  }
}

module.exports = RandomSgxDataFetcherAdapter;
