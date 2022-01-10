import Portfolio from './portfolio'

describe('shares portfolio', () => {

  let portfolio;

  beforeEach( () => {
    portfolio = Portfolio.create()
  })

  it('0 count when no purchases made', () => {
    expect(portfolio.symbols.length()).toBe(0)
  })
})