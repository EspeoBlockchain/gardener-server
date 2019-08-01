import * as ffi from 'ffi';
import * as ref from 'ref';

import DataFetcher from '@core/domain/common/port/DataFetcherPort';
import Request from '@core/domain/request/Request';
import RequestUrlParser from '@core/domain/request/RequestUrlParser';

const intType = ref.types.int;
const longType = ref.types.long;
const longPtrType = ref.refType(ref.types.long);

class RandomSgxDataFetcherAdapter implements DataFetcher {
  private readonly generateRandom: any;
  constructor() {
    this.generateRandom = this.loadFunctionFromSgxLib(
        'generateRandom',
        intType,
        [longType, longType, longPtrType],
    );
  }

  async fetch(request: Request) {
    const min = RequestUrlParser.resolveLeftSideBound(request.url);
    const max = RequestUrlParser.resolveRightSideBound(request.url);

    const longPtrBuf = ref.alloc(longType);

    if (await this.generateRandom(await this.numberToLong(min), await this.numberToLong(max), longPtrBuf) === -1) {
      throw new Error('SGX call failed');
    }

    return ref.deref(longPtrBuf).toString();
  }

  private loadFunctionFromSgxLib(name, returnType, params) {
    // tslint:disable-next-line:no-bitwise
    const mode = ffi.DynamicLibrary.FLAGS.RTLD_NOW | ffi.DynamicLibrary.FLAGS.RTLD_GLOBAL;

    ffi.DynamicLibrary('libsgx_urts.so', mode);
    ffi.DynamicLibrary('Enclave.signed.so', mode);
    const sgxLib = ffi.DynamicLibrary('EnclaveWrapper.so', mode);

    return ffi.ForeignFunction(sgxLib.get(name), returnType, params);
  }

  private async numberToLong(num) {
    const buf = ref.alloc(longType, num);

    return ref.deref(buf);
  }
}

export default RandomSgxDataFetcherAdapter;
