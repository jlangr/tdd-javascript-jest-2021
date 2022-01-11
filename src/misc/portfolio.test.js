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
    [
      { shares: 0, info: 'zero disallowed' },
      { shares: -10, info: 'negative numbers disallowed' },
    ].forEach(({ shares, _info }) => {
      it('barfs on purchase of 0 shares', () => {
        expect(() => Portfolio.purchase(portfolio, 'BAYN', shares)).toThrow()
      })
    })
  })

  describe('sell shares', () => {
    it('should sell given number of shares', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 20)
      newPortfolio = Portfolio.sell(newPortfolio, 'BAYN', 10)
      expect(Portfolio.sharesOf(newPortfolio, 'BAYN')).toEqual(10)
    })

    it('should not sell more shares than you have', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 20)
      expect(() => Portfolio.sell(newPortfolio, 'BAYN', 30)).toThrow()
    })

    it('should not sell more symbol you do not have', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 20)
      expect(() => Portfolio.sell(newPortfolio, 'TESL', 30)).toThrow()
    })

    it('should remove the symbol when selling all of a stock', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 20)
      newPortfolio = Portfolio.sell(newPortfolio, 'BAYN', 20)
      expect(newPortfolio).toEqual({sharesBySymbol: {}})
    })
  })

})

