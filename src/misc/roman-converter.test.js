import { convert } from './roman-converter'

describe('roman converter test', () => {

  it("can convert 1 to roman numeral", () => {

    expect(convert(1)).toBe("I")

  })

})