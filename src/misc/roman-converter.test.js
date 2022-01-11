import { convert } from './roman-converter'

describe('roman converter test', () => {

  it("can convert 1 to roman numeral", () => {
    expect(convert(1)).toBe("I")
  })

  it("can convert 3 to roman numeral", () => {
    expect(convert(3)).toBe("III")
  })

  [{number:1, roman:"I"}].forEach({number, roman} => {
    it("can convert 1 to roman numeral", () => {
      expect(convert(1)).toBe("I")
    })
  });
})