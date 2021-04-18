import { normalize } from './name-normalizer'

describe('a name normalizer', () => {
  it('returns empty when passed empty string', () => {
    expect(normalize('')).toEqual('')
  })

  it('returns single word name', () => {
    expect(normalize('Plato')).toEqual('Plato')
  })

  it('swaps first and last names', () => {
    expect(normalize('Haruki Murakami')).toEqual('Murakami, Haruki')
  })

  it('trims leading and trailing whitespace', () => {
    expect(normalize('  Big Boi   ')).toEqual('Boi, Big')
  })

  it('initializes middle names', () => {
    expect(normalize('Phineas Taylor Barnum')).toEqual('Barnum, Phineas T.')
  })

  it('does not initialize single-letter middle names', () => {
    expect(normalize('Harry S Truman')).toEqual('Truman, Harry S')
  })

  it('initializes multiple middle names', () => {
    expect(normalize('Julia Scarlett Elizabeth Louis-Dreyfus')).toEqual('Louis-Dreyfus, Julia S. E.')
  })

  it('appends suffixes', () => {
    expect(normalize('Martin Luther King, Jr.')).toEqual('King, Martin L., Jr.')
  })

  it('throws on too many commas', () => {
    expect(() => { normalize('Martin, Luther King, Jr.') }).toThrow()
  })
})
