export default interface BlockchainPort {
  getBlockNumber(): Promise<number>;
}
