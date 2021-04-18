const conversions = [
  {arabicDigit: 1000, romanDigit: 'M'},
  {arabicDigit: 900, romanDigit: 'CM'},
  {arabicDigit: 500, romanDigit: 'D'},
  {arabicDigit: 400, romanDigit: 'CD'},
  {arabicDigit: 100, romanDigit: 'C'},
  {arabicDigit: 90, romanDigit: 'XC'},
  {arabicDigit: 50, romanDigit: 'L'},
  {arabicDigit: 40, romanDigit: 'XL'},
  {arabicDigit: 10, romanDigit: 'X'},
  {arabicDigit: 9, romanDigit: 'IX'},
  {arabicDigit: 5, romanDigit: 'V'},
  {arabicDigit: 4, romanDigit: 'IV'},
  {arabicDigit: 1, romanDigit: 'I'}]

const convert = arabic =>
  conversions.reduce(
    (acc, {arabicDigit, romanDigit}) => {
      const repeatDigits = Math.floor(arabic / arabicDigit)
      arabic -= repeatDigits * arabicDigit
      return acc + romanDigit.repeat(repeatDigits)
    },
    '')

describe('roman conversion', () => {
  it('converts numbers', () => {
    expect(convert(1)).toEqual('I')
    expect(convert(2)).toEqual('II')
    expect(convert(3)).toEqual('III')
    expect(convert(10)).toEqual('X')
    expect(convert(11)).toEqual('XI')
    expect(convert(20)).toEqual('XX')
    expect(convert(313)).toEqual('CCCXIII')
    expect(convert(3049)).toEqual('MMMXLIX')
  })
})