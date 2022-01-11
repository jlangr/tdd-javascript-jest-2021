import { convert } from './roman-converter'

describe('roman converter test', () => {
  let testArray = [{number:1, roman:"I"}, {number: 3, roman: "III"}]
  testArray.forEach(({number, roman}) => {
    it(`can convert ${number} to roman numeral`, () => {
      expect(convert(number)).toBe(roman)
    })
  });
})