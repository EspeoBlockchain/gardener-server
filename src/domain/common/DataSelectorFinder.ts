class DataSelectorFinder {
  constructor(private selectors) {}

  find(contentType) {
    const validSelectors = this.selectors
      .filter(selector => selector.canHandle(contentType));

    if (validSelectors.length === 0) {
      throw new Error(`Lack of selector supporting ${contentType}`);
    }
    if (validSelectors.length > 1) {
      throw new Error(`More than one selector supporting ${contentType}`);
    }

    return validSelectors[0];
  }
}

export default DataSelectorFinder;
