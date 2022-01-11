export const create = () => {
  return { symbols: {} }
}

export const uniqueSymbolCount = (portfolio) => {
  return Object.keys(portfolio.symbols).length
}

export const getSymbolShares = (portfolio, symbol) => {
  return portfolio.symbols[symbol] || 0
}
 
export const purchase = (portfolio, symbol, num) => {
  if (num < 0){
    throw new Error("Can't purchase negative shares")
  }

  let newPortfolio = { ...portfolio }

  newPortfolio.symbols[symbol] = getSymbolShares(portfolio, symbol) + num

  return newPortfolio
}

export const sell = (portfolio, symbol, num) => {
  let newPortfolio = { ...portfolio }

  if(getSymbolShares(portfolio, symbol) === 0) {
    throw new Error("Can't sell shares you don't own")
  }

  if(getSymbolShares(portfolio, symbol) < num){
    throw new Error("Can't sell more share than owned in portfolio.")
  }

  newPortfolio.symbols[symbol] = getSymbolShares(portfolio, symbol) - num
  
  return newPortfolio
}