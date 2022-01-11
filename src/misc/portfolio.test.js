import * as Portfolio from './portfolio'

describe('a portfolio', () => {
  let portfolio

  beforeEach(() => {
    portfolio = Portfolio.create()
  })

  describe('unique symbol count', () => {
    it('is zero when no purchases made', () => {
      expect(Portfolio.uniqueSymbolCount(portfolio)).toEqual(0)
    })

    it('is one after single purchase', () => {
      const newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(1)
    })

    it('increments for each distinct symbol purchase', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)

      newPortfolio = Portfolio.purchase(newPortfolio, 'IBM', 10)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(2)
    })

    it('does not increment for same-symbol purchase', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)

      newPortfolio = Portfolio.purchase(newPortfolio, 'BAYN', 10)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(1)
    })
  })

  describe('shares of symbol', () => {
    it('returns 0 for shares of unpurchased symbol', () => {
      expect(Portfolio.sharesOf(portfolio, 'BAYN')).toEqual(0)

    })

    it('returns shares for single symbol purchase', () => {
      const newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 42)

      expect(Portfolio.sharesOf(newPortfolio, 'BAYN')).toEqual(42)
    })

    it('returns shares for symbol', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 42)
      newPortfolio = Portfolio.purchase(newPortfolio, 'IBM', 100)

      expect(Portfolio.sharesOf(newPortfolio, 'BAYN')).toEqual(42)
    })

    it('adds shares for same-symbol purchase', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 42)
      newPortfolio = Portfolio.purchase(newPortfolio, 'BAYN', 100)

      expect(Portfolio.sharesOf(newPortfolio, 'BAYN')).toEqual(142)
    })
  })

  describe('purchase constraints', () => {
    it('barfs on purchase of non-positive shares', () => {
      expect(() =>  Portfolio.purchase(portfolio, 'BAYN', 0)).toThrow()
      expect(() =>  Portfolio.purchase(portfolio, 'BAYN', -10)).toThrow()
    })
  })

})
