import jp from 'jsonpath';
import DataSelectorPort from '../../../domain/common/port/DataSelectorPort';
import JsonResultConverter from './JsonResultConverter';

class JsonSelectorAdapter implements DataSelectorPort {
  canHandle(contentType: any) {
    return contentType === 'json';
  }

  select(data: any, path: any) {
    const json = typeof data === 'object' ? data : JSON.parse(data);

    if (!path) {
      return JSON.stringify(json);
    }

    const results = jp.query(json, `$${path}`);

    return JsonResultConverter.toString(results);
  }
}

export default JsonSelectorAdapter;
