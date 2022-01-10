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

  it('initializes middle name', () =>
    expect(normalize("Henry David Thoreau")).toEqual("Thoreau, Henry D.")
  )

  it("initializes a single letter middle name properly", () => {
    expect(normalize("Harry S Truman")).toEqual("Truman, Harry S")
  })

  it('throws exception if name of length greater than 3 is used', () => {
    expect(normalize("Nick Alex Dan Chris")).toThrow("Unexpected name format.")
  })
})
