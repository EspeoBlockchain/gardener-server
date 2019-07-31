import jp from 'jsonpath';

import JsonResultConverter from '../../application/selector/json/JsonResultConverter';
import DataSelectorPort from '../../domain/common/port/DataSelectorPort';

class JsonSelectorAdapter implements DataSelectorPort {
  canHandle(contentType: string) {
    return contentType === 'json';
  }

  select(data: any, path: string) {
    const json = typeof data === 'object' ? data : JSON.parse(data);

    if (!path) {
      return JSON.stringify(json);
    }

    const results = jp.query(json, `$${path}`);

    return JsonResultConverter.toString(results);
  }
}

export default JsonSelectorAdapter;
