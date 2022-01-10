export const create = () => {
    let portfolio = {
        uniqueSymbols: []
    }
  return { uniqueSymbols: new Set() }
}

export const uniqueSymbolCount = (portfolio) => {
  return portfolio.uniqueSymbols.size
}

export const getSymbolShares = () => {

}
 
export const purchase = (portfolio, symbol, _num) => {
  let updatedUniqueSymbols = new Set(portfolio.uniqueSymbols)
  updatedUniqueSymbols.add(symbol)
  return { ...portfolio, uniqueSymbols: updatedUniqueSymbols }
}