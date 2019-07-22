import { DataSelectorPort } from '../../domain/common/port';

class IdentitySelectorAdapter implements DataSelectorPort {
  canHandle(contentType: string) {
    return contentType === 'ipfs';
  }

  select(data: any, path: any) {
    if (path) {
      throw new Error('Path must be empty for IdentitySelector');
    }

    return data;
  }
}

export default IdentitySelectorAdapter;
