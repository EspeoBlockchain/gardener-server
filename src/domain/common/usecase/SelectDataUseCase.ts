import DataSelectorFinder from '@core/domain/common/DataSelectorFinder';
import { LoggerPort } from '@core/domain/common/port';
import { InvalidSelectorDataError, NoMatchingElementsFoundError } from '../utils/error';

class SelectDataUseCase {
  constructor(
    private readonly dataSelectorFinder: DataSelectorFinder,
    private readonly logger: LoggerPort,
  ) { }

  async selectFromRawData(fetchedData: any, contentType: any, path: string): Promise<string> {
    let selectedData;

    try {
      selectedData = await this.dataSelectorFinder.find(contentType).select(fetchedData, path);
    } catch (e) {
      throw new InvalidSelectorDataError(e.toString());
    }

    if (selectedData === null) {
      throw new NoMatchingElementsFoundError('No matched elements');
    }

    this.logger.info(`Data selected [selectedData=${selectedData},fetchedData=${fetchedData},contentType=${contentType},path=${path}`);

    return selectedData;
  }
}

export default SelectDataUseCase;
