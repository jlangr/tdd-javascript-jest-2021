import {create, purchase, uniqueSymbolCount} from './portfolio'

describe('shares portfolio', () => {

  let portfolio;

  beforeEach( () => {
    portfolio = create()
  })

  it('0 count when no purchases made', () => {
    expect(uniqueSymbolCount()).toBe(0)
  })

  it('1 unique symbol after 1 purchase', () => {
    purchase(portfolio, "IBM", 16)

    expect(uniqueSymbolCount()).toBe(1)
  })
})