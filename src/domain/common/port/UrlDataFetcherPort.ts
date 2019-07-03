export default interface UrlDataFetcherPort {
  fetch(url: string): Promise<string>;
}
