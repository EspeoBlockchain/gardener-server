export default interface LoggerPort {
  info(message: string): void;
  error(message: string, error): void;
}
