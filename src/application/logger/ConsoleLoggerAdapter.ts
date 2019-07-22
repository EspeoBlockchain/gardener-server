import LoggerPort from '../../domain/common/port/LoggerPort';

class ConsoleLoggerAdapter implements LoggerPort {
  info(message: any): void {
    console.log(message);
  }

  error(message: any, error: any): void {
    console.error(message, error);
  }
}

export default ConsoleLoggerAdapter;
