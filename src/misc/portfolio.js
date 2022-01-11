export const create = () => ({uniqueSymbols: []});

export const purchase = (portfolio, symbol, _numberOfShares) => {
  //TODO make the set be a set of objects, not just symbols
  const newUniqueSymbols = [ ...portfolio.uniqueSymbols ];
  let currentShares = newUniqueSymbols.filter(x => x.symbol === symbol);
  if (currentShares) currentShares.numberOfShares += _numberOfShares;
  newUniqueSymbols.add(symbol);
  return { ...portfolio, uniqueSymbols: newUniqueSymbols }
};

export const uniqueSymbolCount = portfolio => portfolio.uniqueSymbols.size;

export const numberOfShares = (portfolio, symbol) => portfolio.uniqueSymbols[symbol];

