import toRomanNumeral from "./roman-numerals";

describe("Roman Numerals", () => {
  it("returns I's", () => {
    [1, 2, 3].forEach((num) => {
      const result = toRomanNumeral(num);
      expect(result).toEqual("I".repeat(num));
    });
  });

  it("returns V when given 5", () => {
    const result = toRomanNumeral(5);

    expect(result).toEqual("V");
  });

  it("return any combination of 'V' + 'I's when given 6,7, or 8", () => {
    for (const num of [6, 7, 8]) {
      const result = toRomanNumeral(num);
      expect(result).toEqual("V" + "I".repeat(num % 5));
    }
  });

  it("returns X when given 10", () => {
    const result = toRomanNumeral(10);

    expect(result).toEqual("X");
  });

  // test map of symbols (before writing map)
});
