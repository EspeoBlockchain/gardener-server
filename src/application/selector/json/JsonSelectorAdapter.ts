import jp from 'jsonpath';

import DataSelectorPort from '@core/domain/common/port/DataSelectorPort';
import JsonResultConverter from './JsonResultConverter';

class JsonSelectorAdapter implements DataSelectorPort {
  canHandle(contentType: string) {
    return contentType === 'json' || contentType === 'aml';
  }

  select(data: string, path: string): string {
    const json = typeof data === 'object' ? data : JSON.parse(data);

    if (!path) {
      return JSON.stringify(json);
    }

    const results = jp.query(json, `$${path}`);

    return JsonResultConverter.toString(results);
  }
}

export default JsonSelectorAdapter;
