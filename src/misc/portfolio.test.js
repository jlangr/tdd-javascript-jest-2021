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
      const newPortfolio = Portfolio.purchase(portfolio, "BAYN", 10)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(1)
    })

    it('increments for each distinct symbol purchase', () => {
      let newPortfolio = Portfolio.purchase(portfolio, "BAYN", 10)

      newPortfolio = Portfolio.purchase(newPortfolio, "IBM", 10)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(2)
    })

    it('does not increment for same-symbol purchase', () => {
      let newPortfolio = Portfolio.purchase(portfolio, "BAYN", 10)

      newPortfolio = Portfolio.purchase(newPortfolio, "BAYN", 10)

      expect(Portfolio.uniqueSymbolCount(newPortfolio)).toEqual(1)
    })

    it('returns 0 for number of shares if you have not purchased anything', () => {
      expect(Portfolio.numberOfShares(portfolio)).toBe(0);
    });

    it('returns the correct number of shares after making a single purchase', () => {
      let newPortfolio = Portfolio.purchase(portfolio, "BAYN", 10);
      expect(Portfolio.numberOfShares(newPortfolio, "BAYN")).toBe(10);
    });
  })

})

