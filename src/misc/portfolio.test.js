import {create, uniqueSymbolCount} from './portfolio'

describe('shares portfolio', () => {

  let portfolio;

  beforeEach( () => {
    portfolio = create()
  })

  it('0 count when no purchases made', () => {
    expect(uniqueSymbolCount()).toBe(0)
  })
})