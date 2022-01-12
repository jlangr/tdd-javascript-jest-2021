export const create = () => ({ sharesBySymbol: {} })

const validate = numberOfShares => { if (numberOfShares <= 0) throw new Error(); };

const validateAvailable = (sellingShares, existingShares) => {if (sellingShares > existingShares) throw new Error(); }

export const purchase = (portfolio, symbol, numberOfShares) => {
  validate(numberOfShares);
  return {
    ...portfolio,
    sharesBySymbol: {
      ...portfolio.sharesBySymbol,
      [symbol]: sharesOf(portfolio, symbol) + numberOfShares
    }
  }
}

export const sell = (portfolio, symbol, numberOfShares) => {
  validateAvailable(numberOfShares, portfolio.sharesBySymbol[symbol] || 0)
  if (numberOfShares === portfolio.sharesBySymbol[symbol]) {
    delete portfolio.sharesBySymbol[symbol]
    return portfolio
  }
  return {...portfolio, sharesBySymbol: {
    ...portfolio.sharesBySymbol,
    [symbol]: portfolio.sharesBySymbol[symbol] - numberOfShares
  }}
}

export const uniqueSymbolCount = portfolio =>
  Object.keys(portfolio.sharesBySymbol).length

export const sharesOf = (portfolio, symbol) => portfolio.sharesBySymbol[symbol] || 0

export const getValueOfShares = (portfolio, symbol, stockPriceApi) => {
  const symbolPrice = stockPriceApi(symbol);
  const shares = sharesOf(portfolio, symbol);
  return shares * symbolPrice;
};

export const getTotalValue = (portfolio, stockPriceApi) => {
  let totalValue = 0;
  Object.keys(portfolio.sharesBySymbol).forEach(symbol => {
    totalValue += getValueOfShares(portfolio, symbol, stockPriceApi)
  })
  return totalValue
}
