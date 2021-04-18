export const value = (portfolio, stockService) =>
  Object.entries(portfolio.holdings)
    .reduce((total, entry) => {
      const [symbol, shares] = entry
      return total + (stockService(symbol) * shares)},
    0)

export const symbolCount = portfolio =>
  Object.keys(portfolio.holdings).length

export const purchase = (portfolio, symbol, shares) =>
  ({
    ...portfolio,
    holdings: { ...portfolio.holdings, [symbol]: shares + sharesOf(portfolio, symbol) },
    shares: shares })

export const removeIfEmpty = (portfolio, symbol) => {
  if (sharesOf(portfolio, symbol) === 0) {
    const newHoldings = {...portfolio.holdings }
    delete newHoldings[symbol]
    return {...portfolio, holdings: newHoldings }
  }
  else
    return portfolio
}

export const sell = (portfolio, symbol, shares) => {
  let updatedPortfolio = purchase(portfolio, symbol, -shares)
  return removeIfEmpty(updatedPortfolio, symbol)
}

export const sharesOf = (portfolio, symbol) =>
  (symbol in portfolio.holdings)
    ? portfolio.holdings[symbol]
    : 0

export const isEmpty = portfolio => symbolCount(portfolio) === 0

export const create = () => ({ holdings: {} })