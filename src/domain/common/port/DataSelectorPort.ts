export default interface DataSelectorPort {
  select(data: string, path: string): string;
  canHandle(contentType: string): boolean;
}
