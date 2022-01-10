export const create = () => {
  return { uniqueSymbols: new Set(), symbols: {} }
}

export const uniqueSymbolCount = (portfolio) => {
  return portfolio.uniqueSymbols.size
}

export const getSymbolShares = (portfolio, symbol) => {
  return portfolio.symbols
}
 
export const purchase = (portfolio, symbol, num) => {
  let updatedUniqueSymbols = new Set(portfolio.uniqueSymbols)
  updatedUniqueSymbols.add(symbol)

  let countCurrentSymbol = portfolio.symbols[symbol] ?? 0
  countCurrentSymbol += num
  portfolio.symbols[symbol] = countCurrentSymbol

  return { ...portfolio, uniqueSymbols: updatedUniqueSymbols }
}