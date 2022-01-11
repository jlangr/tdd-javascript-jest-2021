export const create = () => ({ sharesBySymbol: {} })

const validate = numberOfShares => { if (numberOfShares <= 0) throw new Error(); };

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

export const uniqueSymbolCount = portfolio =>
  Object.keys(portfolio.sharesBySymbol).length

export const sharesOf = (portfolio, symbol) => portfolio.sharesBySymbol[symbol] || 0


