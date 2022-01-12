import * as NASDAQ from './stockLookup'

export const value = (portfolio, stockPriceLookupFunction=NASDAQ.price) =>
  Object.entries(portfolio.sharesBySymbol).reduce((total, [symbol, shares]) =>
    total + shares * stockPriceLookupFunction(symbol)
  , 0)

export const create = () => ({ sharesBySymbol: {} })

const throwWhenNonPositive = numberOfShares => {
  if (numberOfShares <= 0) throw new Error('shares must be positive');
}

const throwOnOversell = (portfolio, symbol, numberOfShares) => {
  if (numberOfShares > sharesOf(portfolio, symbol)) throw new Error('oversell')
}

const removeSymbolIfSoldOut = (portfolio, symbol) => {
  if (sharesOf(portfolio, symbol) === 0)
    delete portfolio.sharesBySymbol[symbol]
  return portfolio
}

const transact = (portfolio, symbol, numberOfShares) => ({ ...portfolio,
  sharesBySymbol: { ...portfolio.sharesBySymbol,
    [symbol]: sharesOf(portfolio, symbol) + numberOfShares
  }
})

export const sell = (portfolio, symbol, numberOfShares) => {
  throwWhenNonPositive(numberOfShares);
  throwOnOversell(portfolio, symbol, numberOfShares)
  let newPortfolio = transact(portfolio, symbol, -numberOfShares)
  newPortfolio = removeSymbolIfSoldOut(newPortfolio, symbol)
  return newPortfolio
}

export const purchase = (portfolio, symbol, numberOfShares) => {
  throwWhenNonPositive(numberOfShares);
  return transact(portfolio, symbol, numberOfShares);
}

export const uniqueSymbolCount = portfolio =>
  Object.keys(portfolio.sharesBySymbol).length

export const sharesOf = (portfolio, symbol) =>
  portfolio.sharesBySymbol[symbol] || 0

