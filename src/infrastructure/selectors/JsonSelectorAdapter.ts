import * as jp from 'jsonpath';
import DataSelectorPort from '../../domain/common/port/DataSelectorPort';

class JsonSelectorAdapter extends DataSelectorPort {
  canHandle(contentType) {
    return contentType === 'json';
  }

  select(data, path) {
    const json = typeof data === 'object' ? data : JSON.parse(data);

    if (!path) {
      return JSON.stringify(json);
    }

    const value = jp.value(json, `$${path}`);

    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      return value;
    }

    return JSON.stringify(value);
  }
}

export default JsonSelectorAdapter;
