import { convert } from './roman-converter'

describe('roman converter test', () => {

  let testArray = [
    {number:1, roman:"I"},
    {number: 3, roman: "III"},
    {number: 4, roman: "IV"},
    {number: 5, roman: "V"}
  ]
  testArray.forEach(({number, roman}) => {
    it(`can convert ${number} to roman numeral`, () => {
      expect(convert(number)).toBe(roman)
    })
  });
})