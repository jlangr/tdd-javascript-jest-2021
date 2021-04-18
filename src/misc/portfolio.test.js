import * as Portfolio from './portfolio'

const BAYER_CURRENT_PRICE = 10
const IBM_CURRENT_PRICE = 20

describe('a portfolio', () => {
  describe('when created', () => {
    let portfolio

    beforeEach(() => {
      portfolio = Portfolio.create()
    })

    it('is empty', () => {
      expect(Portfolio.isEmpty(portfolio)).toEqual(true)
    })

    it('has symbol count zero', () => {
      expect(Portfolio.symbolCount(portfolio)).toBe(0)
    })

    it('returns 0 for shares of (unpurchased) symbol', () => {
      expect(Portfolio.sharesOf(portfolio, 'BAYN')).toBe(0)
    })

    it('has value 0', () => {
      expect(Portfolio.value(portfolio)).toEqual(0)
    })
  })

  describe('after a purchase', () => {
    let portfolio

    beforeEach(() => {
      portfolio = Portfolio.create()
      portfolio = Portfolio.purchase(portfolio, 'BAYN', 10)
    })

    it('is not empty', () => {
      expect(Portfolio.isEmpty(portfolio)).toEqual(false)
    })

    it('sets symbol count to 1', () => {
      expect(Portfolio.symbolCount(portfolio)).toEqual(1)
    })

    it('answers shares for symbol purchased', () => {
      expect(Portfolio.sharesOf(portfolio, 'BAYN')).toEqual(10)
    })

    it('has value of symbol price times shares', () => {
      const stockService = _symbol => BAYER_CURRENT_PRICE
      expect(Portfolio.value(portfolio, stockService)).toEqual(BAYER_CURRENT_PRICE * 10)
    })
  })

  describe('after 2nd purchase, different symbol', () => {
    let portfolio

    beforeEach(() => {
      portfolio = Portfolio.create()
      portfolio = Portfolio.purchase(portfolio, 'BAYN', 10)
      portfolio = Portfolio.purchase(portfolio, 'IBM', 20)
    })

    it('increases symbol count', () => {
      expect(Portfolio.symbolCount(portfolio)).toEqual(2)
    })

    it('returns shares as appropriate by symbol', () => {
      expect(Portfolio.sharesOf(portfolio, 'BAYN')).toEqual(10)
    })

    it('has value that accumulates symbol values', () => {
      const stockService = symbol => symbol === 'BAYN' ? BAYER_CURRENT_PRICE : IBM_CURRENT_PRICE
      expect(Portfolio.value(portfolio, stockService)).toEqual(
        BAYER_CURRENT_PRICE * 10 +
        IBM_CURRENT_PRICE * 20)
    })
  })

  describe('after selling some shares', () => {
    let portfolio

    beforeEach(() => {
      portfolio = Portfolio.create()
      portfolio = Portfolio.purchase(portfolio, 'BAYN', 10)
      portfolio = Portfolio.sell(portfolio, 'BAYN', 8)
    })

    it('reduces shares', () => {
      expect(Portfolio.sharesOf(portfolio, 'BAYN')).toEqual(2)
    })
  })

  describe('after selling all shares', () => {
    let portfolio

    beforeEach(() => {
      portfolio = Portfolio.create()
      portfolio = Portfolio.purchase(portfolio, 'BAYN', 8)

      portfolio = Portfolio.sell(portfolio, 'BAYN', 8)
    })

    it('removes symbol', () => {
      expect(Portfolio.symbolCount(portfolio)).toEqual(0)
    })
  })

  describe('after 2nd purchase, same symbol', () => {
    let portfolio

    beforeEach(() => {
      portfolio = Portfolio.create()
      portfolio = Portfolio.purchase(portfolio, 'BAYN', 10)
      portfolio = Portfolio.purchase(portfolio, 'BAYN', 20)
    })

    it('retains symbol count', () => {
      expect(Portfolio.symbolCount(portfolio)).toEqual(1)
    })

    it('returns total of shares purchased for symbol', () => {
      expect(Portfolio.sharesOf(portfolio, 'BAYN')).toEqual(30)
    })
  })
})