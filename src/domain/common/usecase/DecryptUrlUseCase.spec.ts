import {expect} from '@core/config/configuredChai';
import EthCrypto from 'eth-crypto';
import {beforeEach, describe, it} from 'mocha';

import DecryptUrlUseCase from './DecryptUrlUseCase';

describe('DecryptUrlUseCase', () => {
  const someSecret = 'SECRET';
  const someOtherSecret = 'TOP_SECRET';
  const somePrivateKey = '0x0000000000000000000000000000000000000000000000000000000000000001';
  const publicKey = EthCrypto.publicKeyByPrivateKey(somePrivateKey);
  let sut: DecryptUrlUseCase;

  beforeEach(() => {
    sut = new DecryptUrlUseCase(somePrivateKey);
  });

  it('should decrypt json url with secret string', async () => {
    // given
    const cipher = await EthCrypto.encryptWithPublicKey(publicKey, someSecret);

    const encryptedText = `json(https://some.url?apiKey=encrypted(${(EthCrypto.cipher.stringify(cipher))})).chartName`;
    const expected = `json(https://some.url?apiKey=${someSecret}).chartName`;
    // when
    const decrypted = await sut.decrypt(encryptedText);
    // then
    expect(decrypted).to.be.equal(expected);
  });

  it('should decrypt json url with multiple secret strings', async () => {
    // given
    const cipher = await EthCrypto.encryptWithPublicKey(publicKey, someSecret);
    const anotherCipher = await EthCrypto.encryptWithPublicKey(publicKey, someOtherSecret);

    const encryptedText = `json(https://some.url?apiKey=encrypted(${(EthCrypto.cipher.stringify(cipher))})\
&nonSecret=rumourHasIt&secret=encrypted(${(EthCrypto.cipher.stringify(anotherCipher))})).chartName`;
    const expected = `json(https://some.url?apiKey=${someSecret}&nonSecret=rumourHasIt&secret=${someOtherSecret}).chartName`;
    // when
    const decrypted = await sut.decrypt(encryptedText);
    // then
    expect(decrypted).to.be.equal(expected);
  });

  it('should decrypt json url with secret containing non-standard characters', async () => {
    // given
    const nonStandardSecret = '$^#$^!)$#@^($#^#$)()';
    const cipher = await EthCrypto.encryptWithPublicKey(publicKey, nonStandardSecret);
    const encryptedText = `json(https://some.url?secret=encrypted(${(EthCrypto.cipher.stringify(cipher))})`;
    const expected = `json(https://some.url?secret=${nonStandardSecret}`;
    // when
    const decrypted = await sut.decrypt(encryptedText);
    // then
    expect(decrypted).to.be.equal(expected);
  });
});
