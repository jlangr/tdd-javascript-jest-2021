export const create = () => ({uniqueSymbols: new Set()});

export const purchase = (portfolio, symbol, _numberOfShares) => {
  //TODO make the set be a set of objects, not just symbols
  const newUniqueSymbols = new Set(portfolio.uniqueSymbols)
  newUniqueSymbols.add(symbol);
  return { ...portfolio, uniqueSymbols: newUniqueSymbols }
};

export const uniqueSymbolCount = portfolio => portfolio.uniqueSymbols.size;

export const numberOfShares = (portfolio, symbol) => portfolio.uniqueSymbols[symbol];

