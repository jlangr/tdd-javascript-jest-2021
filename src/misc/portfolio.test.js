import {create, purchase, uniqueSymbolCount} from './portfolio'

describe('shares portfolio', () => {

  let portfolio;

  beforeEach( () => {
    portfolio = create()
  })

  it('does not have any symbols when first created', () => {
    expect(uniqueSymbolCount(portfolio)).toBe(0)
  })

  it('has one unique symbol after purchasing first symbol', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)

    expect(uniqueSymbolCount(newPortfolio)).toBe(1)
  })

  it('increases unique symbol count by one when purchasing an additional symbol', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)
    newPortfolio = purchase(newPortfolio, "AAPL", 10)

    expect(uniqueSymbolCount(newPortfolio)).toBe(2)
  })

  it('does not increase symbol count when purchasing same symbol', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)
    newPortfolio = purchase(newPortfolio, "IBM", 10)

    expect(uniqueSymbolCount(newPortfolio)).toBe(1)
  })
})