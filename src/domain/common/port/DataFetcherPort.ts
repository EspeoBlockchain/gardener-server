export default interface DataFetcherPort {
  fetch(request: string): Promise<string>;
}
