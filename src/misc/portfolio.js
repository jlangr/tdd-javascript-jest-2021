export const create = () => {
  return { symbols: {} }
}

export const uniqueSymbolCount = (portfolio) => {
  return Object.keys(portfolio.symbols).length
}

export const getSymbolShares = (portfolio, symbol) => {
  return portfolio.symbols[symbol] || 0
}
 
export const purchase = (portfolio, symbol, num) => {
  let initialShareCount = portfolio.symbols[symbol] || 0

  initialShareCount += num
  portfolio.symbols[symbol] = initialShareCount

  return { ...portfolio }
}