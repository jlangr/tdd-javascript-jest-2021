export default class Portfolio {
  constructor() {
    this.symbols = new Map()
  }
  get getSymbolCount() {
    return this.symbols.size;
  }

  getShareCount(symbol) {
    return this.symbols.get(symbol) || 0
  }

  purchase(symbol, shares) {
		if (shares < 0) {
			throw(new Error('Cannot buy less that 0 shares.'));
		}
		const existingShares = this.getShareCount(symbol)
    this.symbols.set(symbol, shares + existingShares);
  }
}
