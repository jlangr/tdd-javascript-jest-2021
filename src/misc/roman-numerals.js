// map of symbols
const numeralsMap = {
  1:"I",
  5:"V",
  10:"X"
};
// follow existing pattern by iterating over a map of the roman symbols

const toRomanNumeral = (integer) => {
  for (const [int, numeral] of Object.entries(numeralsMap).reverse()) {
    
  }
  const tens = parseInt(integer / 10);
  const fives = parseInt((integer % 10) / 5);
  const fivesMod = integer % 5;

  return `${"X".repeat(tens)}${"V".repeat(fives)}${"I".repeat(fivesMod)}`;

  //   if (fives < 1) {
  //     return "I".repeat(fivesMod);
  //   }
  //   if (integer < 5) {
  //     return "I".repeat(integer);
  //   } else if (integer === 5) {
  //     return "V";
  //   }
};

export default toRomanNumeral;

/*
1: I
5: V
10: X
50: L
100: C
500: D
1000: M

4: IV
40: XL
400: CD
*/
