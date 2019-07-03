import LoggerPort from '../../domain/common/port/LoggerPort';

class ConsoleLoggerAdapter implements LoggerPort {
  info(message): void {
    console.log(message);
  }

  error(message, error): void {
    console.error(message, error);
  }
}

export default ConsoleLoggerAdapter;
