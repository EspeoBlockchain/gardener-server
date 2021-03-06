export default interface LoggerPort {
  info(message: string): void;
  error(message: string, error: Error): void;
}
