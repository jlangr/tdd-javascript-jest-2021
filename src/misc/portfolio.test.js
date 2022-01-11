import {create, purchase, uniqueSymbolCount, getSymbolShares, sell} from './portfolio'

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

  it('does not have any shares of symbol when first created', () => {
    expect(getSymbolShares(portfolio, "IBM")).toBe(0)
  })

  it('does get number of shares for given symbol', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)

    expect(getSymbolShares(newPortfolio, "IBM")).toBe(16)
  })

  it('throws an error if negative shares purchased', () => {
    expect(() => purchase(portfolio, "IBM", -16)).toThrow()
  })

  it('does sell a positive number of shares and reduces the count', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)

    newPortfolio = sell(newPortfolio, "IBM", 6)

    expect(getSymbolShares(newPortfolio, "IBM")).toBe(10)
  })

  it('Does not allow sale of more share than owned', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)

    expect(() => sell(newPortfolio, "IBM", 26) ).toThrow("Can't sell more share than owned in portfolio.")
  })

  it('Does not allow sale of symbol not owned', () => {
    let newPortfolio = purchase(portfolio, "IBM", 16)

    expect(() => sell(newPortfolio, "APPL", 10) ).toThrow("Can't sell shares you don't own")
  })
})