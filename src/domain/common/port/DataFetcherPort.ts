export default interface DataFetcherPort {
  fetch(url: string): Promise<string>;
}
