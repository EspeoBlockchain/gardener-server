export default interface DataSelectorPort {
  select(data, path: string): string;
  canHandle(contentType): boolean;
}
