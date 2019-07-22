class JsonResultConverter {
  static toString(results: any) {
    switch (results.length) {
      case 0:
        return null;
      case 1:
        return typeof results[0] === 'string' ? results[0] : JSON.stringify(results[0]);
      default:
        return JSON.stringify(results);
    }
  }
}

export default JsonResultConverter;
