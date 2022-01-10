import {create, purchase, uniqueSymbolCount} from './portfolio'

describe('shares portfolio', () => {

  let portfolio;

  beforeEach( () => {
    portfolio = create()
  })

  it('0 count when no purchases made', () => {
    expect(uniqueSymbolCount(portfolio)).toBe(0)
  })

  it('1 unique symbol after 1 purchase', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)

    expect(uniqueSymbolCount(newPortfolio)).toBe(1)
  })

  it('2 unique symbol after purchase of additional symbol', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)
    newPortfolio = purchase(newPortfolio, "AAPL", 10)

    expect(uniqueSymbolCount(newPortfolio)).toBe(2)
  })
})