import EthCrypto from 'eth-crypto';

class DecryptUrlUseCase {
  private typeRegex = new RegExp(/(encrypted\(.*?\))/g);

  constructor(private readonly privateKey: string) {
    this.privateKey = privateKey;
  }

  async decrypt(url: string): Promise<string> {
    let result = url;

    if (this.typeRegex.test(url)) {
        for (const group of url.match(this.typeRegex)) {
            const encrypted = group.substr(group.indexOf('(') + 1, group.length - 'encrypted()'.length);

            const decrypted = await EthCrypto.decryptWithPrivateKey(
                this.privateKey,
                EthCrypto.cipher.parse(encrypted),
            );
            result = result.replace(group, decrypted);
        }
    }

    return result;
  }
}

export default DecryptUrlUseCase;
