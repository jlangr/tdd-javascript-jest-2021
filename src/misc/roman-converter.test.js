import { convert } from './roman-converter'

describe('roman converter test', () => {

  let testArray = [
    {number: 1000, roman: "M"},
    {number: 500, roman: "D"},
    {number: 100, roman: "C"},
    {number: 50, roman: "L"},
    {number: 10, roman: "X"},
    {number: 5, roman: "V"},
    {number: 1, roman:"I"},
    {number: 6, roman:"VI"},
    {number: 9, roman:"IX"}
  ]
  testArray.forEach(({number, roman}) => {
    it(`can convert ${number} to roman numeral`, () => {
      expect(convert(number)).toBe(roman)
    })
  });

  it(`can convert prior (4,19,49, etc.) numbers to roman numeral`, () => {
    expect(convert(4)).toBe("IV")
  })
})