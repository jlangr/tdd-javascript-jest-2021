export const create = () => {
    return { uniqueSymbols: 0 }
}

export const uniqueSymbolCount = (portfolio) => {
    return portfolio.uniqueSymbols
}

export const purchase = (portfolio, _symbol, _num) => {
  let updatedUniqueSymbols = portfolio.uniqueSymbols + 1
  return { ...portfolio, uniqueSymbols: updatedUniqueSymbols }
}