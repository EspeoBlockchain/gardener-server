import { DataSelectorPort } from '../../domain/common/port';

class IdentitySelectorAdapter implements DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'ipfs';
  }

  select(data, path) {
    if (path) {
      throw new Error('Path must be empty for IdentitySelector');
    }

    return data;
  }
}

export default IdentitySelectorAdapter;
