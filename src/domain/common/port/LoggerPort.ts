export default interface LoggerPort {
  info(message): void;
  error(message, error): void;
}
