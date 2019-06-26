import {DataSelectorPort} from '@core/domain/common/port';

class IdentitySelectorAdapter implements DataSelectorPort {
  canHandle(contentType: string): boolean {
    return contentType === 'ipfs';
  }

  select(data: string, path: string): string {
    if (path) {
      throw new Error('Path must be empty for IdentitySelector');
    }

    return data;
  }
}

export default IdentitySelectorAdapter;
