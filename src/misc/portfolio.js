export default class Portfolio {
  constructor() {
    this.symbols = new Map();
  }

  /**
   * Function assigned to a getter keyword cannot have a parameter passed to it
   *
   * @readonly
   * @memberof Portfolio
   */
  get getSymbolCount() {
    return this.symbols.size;
  }

  /**
   *
   *
   * @param {String} symbol
   * @return {Number}
   * @memberof Portfolio
   */
  getShareCount(symbol) {
    return this.symbols.get(symbol) || 0;
  }

  purchase(symbol, shares) {
    if (shares < 0) {
      throw new Error("Cannot buy less that 0 shares.");
    }
    const existingShares = this.getShareCount(symbol);
    this.symbols.set(symbol, shares + existingShares);
  }
}
