export default interface DataSelectorPort {
  select(data, path): string;
  canHandle(contentType): boolean;
}
