import * as Portfolio from './portfolio'
import {when} from "jest-when";

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
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 50)
      newPortfolio = Portfolio.purchase(newPortfolio, 'BAYN', 10)

      expect(Portfolio.sharesOf(newPortfolio, 'BAYN')).toEqual(50 + 10)
    })
  })

  describe('purchase constraints', () => {
    [
      { shares: 0, info: 'zero disallowed' },
      { shares: -10, info: 'negative numbers disallowed' },
    ].forEach(({ shares, _info }) => {
      it('barfs on purchase of non-positive shares', () => {
        expect(() => Portfolio.purchase(portfolio, 'BAYN', shares))
          .toThrow('shares must be positive')
      })

      it('barfs on sell of non-positive shares', () => {
        const newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 100)
        expect(() => Portfolio.sell(newPortfolio, 'BAYN', shares))
          .toThrow('shares must be positive')
      })
    })
  })

  describe('selling', () => {
    it('reduces share count by sell amount', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 42)

      newPortfolio = Portfolio.sell(newPortfolio, 'BAYN', 22)

      expect(Portfolio.sharesOf(newPortfolio, 'BAYN')).toEqual(20)
    })

    it('throws on oversell', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 42)

      expect(() => Portfolio.sell(newPortfolio, 'BAYN', 42 + 1)).toThrow('oversell')
    })

    it('removes symbol when totally sold', () => {
      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 42)

      newPortfolio = Portfolio.sell(newPortfolio, 'BAYN', 42)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(0)
    })
  })

  describe('value', () => {
    const BAYER_CURRENT_PRICE = 16
    const APPLE_CURRENT_PRICE = 100000

    it('is worthless when empty', () => {
      expect(Portfolio.value(portfolio)).toEqual(0)
    })

    it('is current price of symbol for single-share purchase', () => {
      const stubStockService = _symbol => BAYER_CURRENT_PRICE

      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 1)

      expect(Portfolio.value(newPortfolio, stubStockService)).toEqual(BAYER_CURRENT_PRICE)
    })

    it('is current price of symbol for single-share purchase', () => {
      const stubStockService = _symbol => BAYER_CURRENT_PRICE

      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)

      expect(Portfolio.value(newPortfolio, stubStockService)).toEqual(10 * BAYER_CURRENT_PRICE)
    })

    it('is current price of symbol for single-share purchase', () => {
      const stubStockService = jest.fn()
      when(stubStockService).calledWith('BAYN').mockReturnValue(BAYER_CURRENT_PRICE)
      when(stubStockService).calledWith('AAPL').mockReturnValue(APPLE_CURRENT_PRICE)

      let newPortfolio = Portfolio.purchase(portfolio, 'BAYN', 10)
      newPortfolio = Portfolio.purchase(newPortfolio, 'AAPL', 20)

      expect(Portfolio.value(newPortfolio, stubStockService))
        .toEqual(10 * BAYER_CURRENT_PRICE + 20 * APPLE_CURRENT_PRICE)
    })
  })
})
