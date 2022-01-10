export default class Portfolio {
  constructor() {
    this.symbols = new Set()
  }
  get getSymbolCount() {
    return this.symbols.size;
  }

  purchase(symbol) {
    this.symbols.add(symbol)
  }
}

// this.symobols.