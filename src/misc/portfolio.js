export const value = (portfolio, priceService) =>
  isEmpty(portfolio) ? 0 : priceService(sharesOf(portfolio, symbol));

export const sharesOf = (portfolio, symbol) =>
  symbol in portfolio.holdings ? portfolio.holdings[symbol] : 0;

export const uniqueSymbolCount = (portfolio) =>
  Object.keys(portfolio.holdings).length;

export const create = () => ({ holdings: {} });

const throwOnNonPositivePurchase = (shares) => {
  if (shares <= 0) throw new RangeError();
};

const transact = (portfolio, symbol, shares) => {
  return {
    holdings: {
      ...portfolio.holdings,
      [symbol]: sharesOf(portfolio, symbol) + shares,
    },
  };
};

export const purchase = (portfolio, symbol, shares) => {
  throwOnNonPositivePurchase(shares);
  return transact(portfolio, symbol, shares);
};

export const sell = (portfolio, symbol, shares) => {
  let newPortfolio = transact(portfolio, symbol, -shares);
  if (sharesOf(newPortfolio, symbol) === 0)
    delete newPortfolio.holdings[symbol];
  return newPortfolio;
};

export const isEmpty = (portfolio) => {
  return uniqueSymbolCount(portfolio) === 0;
};
