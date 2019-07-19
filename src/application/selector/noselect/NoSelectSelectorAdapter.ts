import DataSelectorPort from '../../../domain/common/port/DataSelectorPort';

class NoSelectSelectorAdapter implements DataSelectorPort {
  public canHandle(contentType: string): boolean {
    return contentType === 'random';
  }

  public select(data, path) {
    if (path) {
      throw new Error('Path must be empty for IdentitySelector');
    }

    return data;
  }
}

export default NoSelectSelectorAdapter;
