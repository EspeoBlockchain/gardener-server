// tslint:disable no-empty
import { LoggerPort } from '../../domain/common/port';

export default class SilentLoggerAdapter implements LoggerPort {
  error(message: any, error: any): void { }
  info(message: any): void { }
}
