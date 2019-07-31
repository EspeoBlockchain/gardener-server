import LoggerPort from '@core/domain/common/port/LoggerPort';

class ConsoleLoggerAdapter implements LoggerPort {
  info(message: string): void {
    console.log(message);
  }

  error(message: string, error: Error): void {
    console.error(message, error);
  }
}

export default ConsoleLoggerAdapter;
