// tslint:disable no-empty
import { LoggerPort } from '@core/domain/common/port';

export default class SilentLoggerAdapter implements LoggerPort {
  error(message: string, error: Error): void { }
  info(message: string): void { }
}
