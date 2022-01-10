export const create = () => ({uniqueSymbols: new Set()});

export const purchase = (portfolio, symbol, _numberOfShares) => {
  const newUniqueSymbols = new Set(portfolio.uniqueSymbols)
  newUniqueSymbols.add(symbol)
  return { ...portfolio, uniqueSymbols: newUniqueSymbols }
};

export const uniqueSymbolCount = portfolio => portfolio.uniqueSymbols.size;

