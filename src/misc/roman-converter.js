
const covertUnitsToRoman = (num, conversionDict) => {
  if(num < 1)
    return ""

  let romanUnit = conversionDict[0].romanUnit
  let arabicUnit = conversionDict[0].arabicUnit
  conversionDict.shift()

  return romanUnit.repeat(Math.floor(num/arabicUnit)) +
    covertUnitsToRoman(num%arabicUnit, conversionDict)
}

const convertDigit = (digit, minChar, midChar, maxChar) => {
  switch(digit){
    case 0: return ""
    case 1: return minChar 

    }
}

export const convert = (num) => {
  return covertUnitsToRoman(
    num,
    [
      { romanUnit: "M", arabicUnit: 1000 },
      { romanUnit: "D", arabicUnit: 500 },
      { romanUnit: "C", arabicUnit: 100 },
      { romanUnit: "L", arabicUnit: 50 },
      { romanUnit: "X", arabicUnit: 10 },
      { romanUnit: "V", arabicUnit: 5 },
      { romanUnit: "I", arabicUnit: 1 }
    ]
  )
}

`
I
II
III
IV
V
VI
VII
VIII
IX
X
`